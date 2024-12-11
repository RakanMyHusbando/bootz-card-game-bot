export interface InterCard {
    id: number;
    title: string;
    description: string;
    type: string;
    rarity: number;
    attack: number;
    defense: number;
    health: number;
}

export const GetCardById = async (id: number): Promise<InterCard | null> => {
    const reqAllCard = new Request("http://localhost:5000/card/" + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return await fetch(reqAllCard)
        .then((res) => res.json())
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

export const GetRandomCard = async (): Promise<InterCard | null> => {
    const reqAllCard = new Request("http://localhost:5000/cards/randomCard/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return await fetch(reqAllCard)
        .then((res) => res.json())
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