import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Loading from "../../components/Loading";

const CancelToken = axios.CancelToken;

const MoreUserInfo = () => {
    const { id } = useParams()
    const [user, setUser] = useState({ data: {} })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const source = CancelToken.source();
        let ignor = false
        const getUser = async () => {
            try {
                const res = await axios.get(`https://reqres.in/api/users/${id}`, {
                    cancelToken: source.token
                })
                if (!ignor) setUser(res.data)
            } catch (e) {
                if (axios.isCancel(e)) {

                }
                else {
                }
            } finally {
                if (!ignor) setLoading(false)
            }
        }

        getUser()
        return () => {
            ignor = true
            source.cancel();
        }
    }, [id])


    if (loading) return <Loading />


    const { first_name = "", last_name = "", avatar, email = "" } = user.data

    return (
        <div>
            <p>
                <strong>{`${first_name} ${last_name}`}</strong>
            </p>
            <p>{email}</p>
            <img alt={user.first_name} src={avatar} />
        </div>
    )
}

export default MoreUserInfo