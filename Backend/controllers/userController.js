// get user Data API

export const getUser = async (req, res) => {
  try {
    const role = req?.user?.role;
    const recentSearchCities = req?.user?.recentSearchCities;
    res.json({ success: true, role, recentSearchCities });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// store recent search cities data;

export const storeRecentSearchCities = async (req, res) => {
  try {
    const recentSearchCity = req?.body?.recentSearchCities;
    const user = await req.user;
    if (user.recentSearchCities.length < 3) {
      user.recentSearchCities.push(recentSearchCity);
    } else {
      user.recentSearchCities.shift();
      user.recentSearchCities.push(recentSearchCity);
    }

    await user.save();
    res.json({ success: true, message: "city added" });
  } catch (error) {
    res.json({ success: false, message: error?.message });
  }
};
