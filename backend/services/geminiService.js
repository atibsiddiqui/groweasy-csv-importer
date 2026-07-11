async function mapCSVFields(data) {
  if (!data || data.length === 0) {
    throw new Error("CSV data is empty.");
  }

  const headers = Object.keys(data[0]);

  const findHeader = (patterns) => {
    return (
      headers.find((header) =>
        patterns.some((pattern) =>
          header.toLowerCase().includes(pattern.toLowerCase())
        )
      ) || null
    );
  };

  const mapping = {
    created_at: findHeader(["date", "created", "time"]),
    name: findHeader(["name", "full name", "customer"]),
    email: findHeader(["email"]),
    country_code: findHeader(["country code", "code"]),
    mobile_without_country_code: findHeader([
      "phone",
      "mobile",
      "contact",
    ]),
    company: findHeader([
      "company",
      "organisation",
      "organization",
    ]),
    city: findHeader(["city", "town"]),
    state: findHeader(["state", "province"]),
    country: findHeader(["country"]),
    lead_owner: findHeader(["owner", "assigned"]),
    crm_status: findHeader(["status"]),
    crm_note: findHeader([
      "note",
      "remarks",
      "comment",
    ]),
    data_source: findHeader(["source"]),
    possession_time: findHeader([
      "possession",
      "delivery",
    ]),
    description: findHeader([
      "description",
      "details",
      "message",
    ]),
  };

  const records = [];
  let skipped = 0;

  data.forEach((row) => {
    const email = mapping.email
      ? row[mapping.email]
      : "";

    const mobile = mapping.mobile_without_country_code
      ? row[mapping.mobile_without_country_code]
      : "";

    // Skip invalid records
    if (!email && !mobile) {
      skipped++;
      return;
    }

    records.push({
      created_at: mapping.created_at
        ? row[mapping.created_at]
        : new Date().toISOString(),

      name: mapping.name
        ? row[mapping.name]
        : "",

      email: email || "",

      country_code: mapping.country_code
        ? row[mapping.country_code]
        : "+91",

      mobile_without_country_code:
        mobile || "",

      company: mapping.company
        ? row[mapping.company]
        : "",

      city: mapping.city
        ? row[mapping.city]
        : "",

      state: mapping.state
        ? row[mapping.state]
        : "",

      country: mapping.country
        ? row[mapping.country]
        : "India",

      lead_owner: mapping.lead_owner
        ? row[mapping.lead_owner]
        : "",

      crm_status: mapping.crm_status
        ? row[mapping.crm_status]
        : "GOOD_LEAD_FOLLOW_UP",

      crm_note: mapping.crm_note
        ? row[mapping.crm_note]
        : "",

      data_source: mapping.data_source
        ? row[mapping.data_source]
        : "",

      possession_time: mapping.possession_time
        ? row[mapping.possession_time]
        : "",

      description: mapping.description
        ? row[mapping.description]
        : "",
    });
  });

  return {
    summary: {
      total: data.length,
      imported: records.length,
      skipped,
    },
    mapping,
    confidence: Object.fromEntries(
      Object.keys(mapping).map((key) => [
        key,
        mapping[key] ? 100 : 0,
      ])
    ),
    records,
  };
}

module.exports = {
  mapCSVFields,
};