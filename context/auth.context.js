import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "@/lib/ironOptions";
import { useState, createContext } from "react";

export const AuthContext = createContext({});

export const getUserFromSession = withIronSessionSsr(async ({ req }) => {
    if (req.session.user === undefined) {
        return null;
    } else {
        const user = req.session.user;
        return user;
    }
}, ironOptions);

export function AuthProvider({ children, ssrUser, ...props }) {
    const [user, setUser] = useState(ssrUser);
    const [page, setPage] = useState("profile");
    const [addModal, setAddModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [itemStartDate, setItemStartDate] = useState(null)
    const [itemEndDate, setItemEndDate] = useState(null)
    const [itemPrice, setItemPrice] = useState(null)
    const [itemDays, setItemDays] = useState(null)
    const [itemId, setItemId] = useState(null)
    const auth = {
        user,
        page,
        setPage,
        addModal,
        setAddModal,
        editItem,
        setEditItem,
        itemStartDate,
        setItemStartDate,
        itemEndDate,
        setItemEndDate,
        itemPrice,
        setItemPrice,
        itemDays,
        setItemDays,
        itemId,
        setItemId,
        ...props
    }
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}