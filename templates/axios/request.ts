
import axios from '../../axios';

export const __name__ = async () => {
    const { data } = await axios.__method__('/__name__')

    return data;
}
