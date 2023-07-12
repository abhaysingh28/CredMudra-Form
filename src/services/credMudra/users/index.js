import apiEndPointsConfig from '../../apiEndPointsConfig';
import { apiAuthService } from '../../axiosInstance';

export const getPrePopulateFormData = async (data) => {
    try {
        const res = await apiAuthService.post(apiEndPointsConfig.PrePopulateFormData, { data });
        if (res.status === 200) {
            console.log('getPrePopulateFormData details processing');
            return res;
        } else {
            return { message: 'try again' };
        }
    } catch (err) {
        return err;
    }
};
