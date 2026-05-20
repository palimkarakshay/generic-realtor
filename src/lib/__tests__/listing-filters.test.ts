import { describe, expect, it } from "vitest";
import {
  applyFilters,
  defaultFilters,
  filtersFromSearchParams,
  filtersToSearchParams,
  listingsForMode,
  matchesBeds,
  priceFor,
} from "@/lib/listing-filters";
import type { Listing, RentListing, SaleListing } from "@/lib/schemas";

const baseFields = {
  province: "ON",
  description: "x",
  features: [],
  photos: [],
  createdAt: "2026-01-01",
};

function sale(over: Partial<SaleListing> = {}): SaleListing {
  return {
    ...baseFields,
    listingId: "s1",
    slug: "s-one",
    title: "Sale One",
    address: "1 First St",
    city: "Kitchener",
    beds: 3,
    baths: 2,
    propertyType: "detached",
    listingType: "sale",
    price: 800_000,
    status: "active",
    ...over,
  } as SaleListing;
}

function rent(over: Partial<RentListing> = {}): RentListing {
  return {
    ...baseFields,
    listingId: "r1",
    slug: "r-one",
    title: "Rent One",
    address: "2 Second St",
    city: "Waterloo",
    beds: 2,
    baths: 1,
    propertyType: "condo-apartment",
    listingType: "rent",
    monthlyRent: 2_400,
    status: "active",
    leaseTerm: "12-months",
    furnished: "none",
    petsAllowed: "case-by-case",
    parkingIncluded: false,
    utilitiesIncluded: ["none"],
    ...over,
  } as RentListing;
}

describe("listingsForMode", () => {
  it("returns active sales for mode=sale", () => {
    const list: Listing[] = [
      sale({ slug: "a", status: "active" }),
      sale({ slug: "b", status: "sold", soldPrice: 750_000 }),
      rent({ slug: "c" }),
    ];
    expect(listingsForMode(list, "sale").map((l) => l.slug)).toEqual(["a"]);
  });

  it("returns active rentals for mode=rent", () => {
    const list: Listing[] = [
      sale({ slug: "a" }),
      rent({ slug: "b", status: "active" }),
      rent({ slug: "c", status: "leased" }),
    ];
    expect(listingsForMode(list, "rent").map((l) => l.slug)).toEqual(["b"]);
  });

  it("returns sold sales for mode=sold", () => {
    const list: Listing[] = [
      sale({ slug: "a", status: "active" }),
      sale({ slug: "b", status: "sold", soldPrice: 750_000 }),
      sale({ slug: "c", status: "sold", soldPrice: 600_000 }),
    ];
    expect(listingsForMode(list, "sold").map((l) => l.slug)).toEqual(["b", "c"]);
  });
});

describe("priceFor", () => {
  it("uses monthlyRent for rent mode", () => {
    expect(priceFor(rent({ monthlyRent: 2_100 }), "rent")).toBe(2_100);
  });

  it("uses price for sale mode", () => {
    expect(priceFor(sale({ price: 850_000 }), "sale")).toBe(850_000);
  });

  it("prefers soldPrice for sold mode, falls back to price", () => {
    expect(priceFor(sale({ price: 800_000, soldPrice: 825_000 }), "sold")).toBe(825_000);
    expect(priceFor(sale({ price: 800_000 }), "sold")).toBe(800_000);
  });

  it("returns NaN when mode/listingType mismatch", () => {
    expect(priceFor(sale(), "rent")).toBeNaN();
    expect(priceFor(rent(), "sale")).toBeNaN();
  });
});

describe("matchesBeds", () => {
  it("matches anything when chips empty or undefined", () => {
    expect(matchesBeds(sale({ beds: 7 }), undefined)).toBe(true);
    expect(matchesBeds(sale({ beds: 7 }), [])).toBe(true);
  });

  it("matches exact bed counts for non-open chips", () => {
    expect(matchesBeds(sale({ beds: 1 }), [1, 2, 3])).toBe(true);
    expect(matchesBeds(sale({ beds: 3 }), [1, 2, 3])).toBe(true);
    expect(matchesBeds(sale({ beds: 5 }), [1, 2, 3])).toBe(false);
  });

  it("treats only the 4+ chip as open-ended", () => {
    expect(matchesBeds(sale({ beds: 4 }), [4])).toBe(true);
    expect(matchesBeds(sale({ beds: 7 }), [4])).toBe(true);
    expect(matchesBeds(sale({ beds: 3 }), [4])).toBe(false);
  });

  it("does not treat single-chip selections like [0] as open-ended", () => {
    expect(matchesBeds(sale({ beds: 0 }), [0])).toBe(true);
    expect(matchesBeds(sale({ beds: 1 }), [0])).toBe(false);
    expect(matchesBeds(sale({ beds: 5 }), [0])).toBe(false);
  });

  it("composes 4+ alongside exact chips", () => {
    expect(matchesBeds(sale({ beds: 2 }), [2, 4])).toBe(true);
    expect(matchesBeds(sale({ beds: 4 }), [2, 4])).toBe(true);
    expect(matchesBeds(sale({ beds: 5 }), [2, 4])).toBe(true);
    expect(matchesBeds(sale({ beds: 3 }), [2, 4])).toBe(false);
  });
});

describe("applyFilters", () => {
  const universe: Listing[] = [
    sale({ slug: "a", price: 750_000, beds: 3, propertyType: "detached", city: "Kitchener" }),
    sale({ slug: "b", price: 1_200_000, beds: 4, propertyType: "detached", city: "Waterloo" }),
    sale({ slug: "c", price: 550_000, beds: 2, propertyType: "townhouse", city: "Cambridge" }),
    sale({ slug: "d", status: "sold", soldPrice: 700_000, beds: 3, price: 720_000, city: "Kitchener" }),
    rent({ slug: "r1", monthlyRent: 1_900, beds: 1, propertyType: "condo-apartment", city: "Kitchener" }),
    rent({ slug: "r2", monthlyRent: 2_800, beds: 2, propertyType: "condo-apartment", city: "Waterloo" }),
    rent({ slug: "r3", monthlyRent: 3_500, beds: 3, propertyType: "townhouse", city: "Waterloo" }),
  ];

  it("filters by mode without other filters", () => {
    expect(applyFilters(universe, { mode: "sale" }).map((l) => l.slug)).toEqual(["a", "b", "c"]);
    expect(applyFilters(universe, { mode: "rent" }).map((l) => l.slug)).toEqual(["r1", "r2", "r3"]);
    expect(applyFilters(universe, { mode: "sold" }).map((l) => l.slug)).toEqual(["d"]);
  });

  it("applies price bounds against the mode's price field", () => {
    expect(
      applyFilters(universe, { mode: "rent", priceMin: 2_000, priceMax: 3_000 }).map((l) => l.slug),
    ).toEqual(["r2"]);
    expect(
      applyFilters(universe, { mode: "sale", priceMax: 800_000 }).map((l) => l.slug),
    ).toEqual(["a", "c"]);
  });

  it("treats priceMax=0 as no upper bound", () => {
    expect(
      applyFilters(universe, { mode: "sale", priceMin: 1_000_000, priceMax: 0 }).map((l) => l.slug),
    ).toEqual(["b"]);
  });

  it("filters by exact beds chips", () => {
    expect(
      applyFilters(universe, { mode: "sale", beds: [3] }).map((l) => l.slug),
    ).toEqual(["a"]); // exactly 3
    expect(
      applyFilters(universe, { mode: "rent", beds: [1, 2] }).map((l) => l.slug),
    ).toEqual(["r1", "r2"]); // only the 1bd and 2bd, not the 3bd
  });

  it("filters by 4+ open-ended chip", () => {
    expect(
      applyFilters(universe, { mode: "sale", beds: [3, 4] }).map((l) => l.slug),
    ).toEqual(["a", "b"]); // exactly 3 OR 4+
  });

  it("filters by property types", () => {
    expect(
      applyFilters(universe, { mode: "sale", propertyTypes: ["townhouse"] }).map((l) => l.slug),
    ).toEqual(["c"]);
    expect(
      applyFilters(universe, {
        mode: "rent",
        propertyTypes: ["condo-apartment", "townhouse"],
      }).map((l) => l.slug),
    ).toEqual(["r1", "r2", "r3"]);
  });

  it("filters by city case-insensitively", () => {
    expect(
      applyFilters(universe, { mode: "rent", city: "waterloo" }).map((l) => l.slug),
    ).toEqual(["r2", "r3"]);
    expect(applyFilters(universe, { mode: "sale", city: "  " }).length).toBe(3); // blank is ignored
  });

  it("composes all filters together", () => {
    expect(
      applyFilters(universe, {
        mode: "rent",
        priceMax: 3_000,
        beds: [2],
        city: "Waterloo",
      }).map((l) => l.slug),
    ).toEqual(["r2"]);
  });
});

describe("URL serialization", () => {
  it("defaultFilters returns mode-appropriate bounds", () => {
    expect(defaultFilters("rent").priceMax).toBe(6000);
    expect(defaultFilters("sale").priceMin).toBe(300_000);
    expect(defaultFilters().mode).toBe("rent");
  });

  it("filtersToSearchParams omits defaults for a clean URL", () => {
    const out = filtersToSearchParams(defaultFilters("rent"));
    expect(out.get("mode")).toBe("rent");
    expect(out.get("min")).toBeNull();
    expect(out.get("max")).toBeNull();
    expect(out.get("beds")).toBeNull();
  });

  it("filtersToSearchParams emits only non-default fields", () => {
    const out = filtersToSearchParams({
      mode: "sale",
      priceMin: 300_000, // default — omit
      priceMax: 900_000, // non-default — include
      beds: [2, 3],
      propertyTypes: ["detached"],
      city: "Kitchener",
    });
    expect(out.get("mode")).toBe("sale");
    expect(out.get("min")).toBeNull();
    expect(out.get("max")).toBe("900000");
    expect(out.get("beds")).toBe("2,3");
    expect(out.get("types")).toBe("detached");
    expect(out.get("city")).toBe("Kitchener");
  });

  it("filtersFromSearchParams round-trips", () => {
    const original = {
      mode: "sale" as const,
      priceMin: 300_000,
      priceMax: 900_000,
      beds: [2, 3],
      propertyTypes: ["detached" as const],
      city: undefined,
      neighborhoodSlug: undefined,
    };
    const params = filtersToSearchParams(original);
    const parsed = filtersFromSearchParams(params);
    expect(parsed).toEqual(original);
  });

  it("filtersFromSearchParams rejects invalid mode/types", () => {
    const params = new URLSearchParams("mode=bogus&types=invalid,detached");
    const parsed = filtersFromSearchParams(params);
    expect(parsed.mode).toBe("rent"); // fallback
    expect(parsed.propertyTypes).toEqual(["detached"]); // bogus dropped
  });
});
