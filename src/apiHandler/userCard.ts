import {InterCard} from "./interfaces"

export const GetRandomCard = async (userId: number): Promise<InterCard | null> => {
    const reqAllCard = new Request(`http://localhost:5000/user/${userId}/card/random`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return await fetch(reqAllCard)
        
        .then((res) => {console.log(res)
            return res.json()})
        .then((res) =>
            res.status === 200 && res.data && res.data.length != 0
                ? (res.data[0] as InterCard)
                : null,
        )
        .catch((err) => {
            console.error(err);
            return null;
        });
};