import { apiAuthService } from "services/axiosInstance";
import apiEndPointsConfig from "../../apiEndPointsConfig";

export const getCountriesList = async (data) => {
  try {
    const res = await apiAuthService.post(apiEndPointsConfig.getCountriesList, {
      data,
    });
    if (res.status == 200) {
      console.log("Countries List");
      return res;
    } else {
      return { message: "try again" };
    }
  } catch (err) {
    return err;
  }
};

export const getStatesList = async (data) => {
  try {
    const res = await apiAuthService.post(apiEndPointsConfig.getStatesList, {
      data,
    });
    if (res.status == 200) {
      console.log("State List");
      return res;
    } else {
      return { message: "try again" };
    }
  } catch (err) {
    return err;
  }
};

export const getCitiesList = async (data) => {
  try {
    const res = await apiAuthService.post(apiEndPointsConfig.getCitiesList, {
      data,
    });
    if (res.status == 200) {
      console.log("cities List");
      return res;
    } else {
      return { message: "try again" };
    }
  } catch (err) {
    return err;
  }
};

export const getPincodesAddress = async (data) => {
  try {
    const res = await apiAuthService.post(apiEndPointsConfig.getPincodesAddress, {
      data,
    });
    if (res.status == 200) {
      console.log("Pincodes List");
      return res;
    } else {
      return { message: "try again" };
    }
  } catch (err) {
    return err;
  }
};
