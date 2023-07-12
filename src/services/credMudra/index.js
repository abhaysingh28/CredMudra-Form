import apiService, { apiAuthService } from '../axiosInstance';
import apiEndPointsConfig from '../apiEndPointsConfig';

export const sendOpt = async (data) => {
    try {
        const res = await apiService.post(apiEndPointsConfig.SendOtp, { data });
        if (res.status == 200) {
            console.log('opt send');
            return res;
        } else {
            return { message: 'try again' };
        }
    } catch (err) {
        return err;
    }
};

export const ValidateOtp = async (data) => {
    try {
        const res = await apiService.post(apiEndPointsConfig.ValidateOtp, { data });
        if (res.status == 200) {
            console.log('opt matching');
            return res;
        } else {
            return { message: 'try again' };
        }
    } catch (err) {
        return err;
    }
};
