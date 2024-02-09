const { getAll } = require("../services/BillService");

test("Get all bill", async () => {
  try {
    const result = await getAll({});
    expect(Array.isArray(result)).toBe(true);
  } catch (error) {
    console.error(`test fail ${error}`);
    throw error;
  }
});
