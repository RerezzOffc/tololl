const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const response = await axios.post('https://api.medanpedia.co.id/services', new URLSearchParams({
      api_id: '31458',
      api_key: 'lksdwx-3rea4c-cpbbu9-ztddu4-vtwzmv',
      service_fav: 0
    }));

    if (response.data.status === false) {
      return res.status(400).json({ message: `Pesan: ${response.data.msg || "Permintaan tidak valid."}` });
    }

    res.json(response.data.data);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ message: "GAGAL Memuat Daftar Layanan." });
  }
};
