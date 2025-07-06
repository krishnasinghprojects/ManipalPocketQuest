class WHOService {
  static async fetchGlobalData() {
    try {
      const response = await fetch('https://covid19.who.int/WHO-COVID-19-global-data.csv');
      const csvText = await response.text();
      return this.parseWHOData(csvText);
    } catch (error) {
      console.error('WHO API fetch failed:', error);
      return null;
    }
  }

  static parseWHOData(csvText) {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
      const values = line.split(',');
      return {
        country: values[2],
        newCases: parseInt(values[4]),
        totalCases: parseInt(values[5]),
        newDeaths: parseInt(values[6]),
        totalDeaths: parseInt(values[7])
      };
    });
  }
}

export default WHOService; 