const { Pinecone } = require("@pinecone-database/pinecone");

class PineconeDB {
  constructor() {
    this.client = null;
    this.index = null;
  }

  async initialize() {
    try {
      const apiKey = process.env.PINECONE_API_KEY;
      const environment = process.env.PINECONE_ENVIRONMENT; // ✅ Add this
      const indexName = process.env.PINECONE_INDEX || "llama-text-embed-v2-index-ak8skgr";

      if (!apiKey || !environment) throw new Error("Missing PINECONE_API_KEY or PINECONE_ENVIRONMENT");

      // ✅ Pass environment explicitly
      this.client = new Pinecone({ apiKey, environment });

      this.index = this.client.index(indexName);

      console.log("✅ Pinecone initialized with index:", indexName);
    } catch (error) {
      console.error("❌ Failed to initialize Pinecone:", error);
      throw error;
    }
  }

  async search(queryVector, topK = 5) {
    const result = await this.index.query({
      topK,
      vector: queryVector,
      includeMetadata: true,
      namespace: "default",
    });
    return result.matches;
  }

  async upsert(records) {
    await this.index.upsert({
      vectors: records,
      namespace: "default"
    });
    console.log(`✅ Upserted ${records.length} vectors`);
  }
}

module.exports = new PineconeDB();
