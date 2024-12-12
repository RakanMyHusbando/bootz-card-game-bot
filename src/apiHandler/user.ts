import { InterGetUser, InterPostUser } from "./interfaces";

export const GetUserByDcId = async (
    dcId: string,
): Promise<InterGetUser | null> => {
    const req = new Request("http://localhost:5000/user", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return await fetch(req)
        .then((res) => res.json())
        .then((res) =>
            res.status === 200 && res.data && res.data.length != 0
                ? (res.data.find(
                    (user: any) => user.discord_id === dcId,
                ) as InterGetUser)
                : null,
        )
        .catch((err) => {
            console.error(err);
            return null;
        });
};

export const PostUser = async (user: InterPostUser): Promise<string> => {
    const req = new Request("http://localhost:5000/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    return await fetch(req)
        .then((res) => res.json())
        .catch((err) => {
            console.error(err);
            return null;
        });
};
