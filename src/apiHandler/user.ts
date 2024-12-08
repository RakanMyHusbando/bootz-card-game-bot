export interface InterUser {
    id: number;
    name: string;
    discord_id: string;
    cards: InterUserCard[];
}

export interface InterUserCard {
    user_id: number;
    card_id: number;
    own_amount: number;
}

export const GetUserByDcId = async (
    dcId: string,
): Promise<InterUser | null> => {
    const reqAllUser = new Request("http://localhost:5000/user", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return await fetch(reqAllUser)
        .then((res) => res.json())

        .then((res) =>
            res.status === 200 && res.data && res.data.length != 0
                ? (res.data.find(
                      (user: any) => user.discord_id === dcId,
                  ) as InterUser)
                : null,
        )
        .catch((err) => {
            console.error(err);
            return null;
        });
};
