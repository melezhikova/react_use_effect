import { useEffect, useRef, useState } from "react";

export default function Details (props) {
    const { info } = props;

    const [id, setId] = useState(null);
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [hasError, setError] = useState(null);
    const timestampRef = useRef();

    useEffect(() => {
        setId(prevId => prevId === info.id ? prevId : info.id);
    }, [info]);

    useEffect(() => {
        const fetchData = async() => {
            const timestamp = Date.now();
            timestampRef.current = timestamp;
            setLoading(true);
            try {
                const response = await fetch(`${process.env.REACT_APP_LIST_URL}${id}.json`);
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                if (timestampRef.current === timestamp) {
                    const data = await response.json();
                    setData(data);
                }
                setError(null);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    return (
        <div className="userInfo">
            <img className="info" src={data?.avatar} alt="фото пользоваля"></img>
            <div className="info userName">{data?.name}</div>
            <div className="info otherInfo">City: {data?.details.city}</div>
            <div className="info otherInfo">Company: {data?.details.company}</div>
            <div className="info otherInfo">Position: {data?.details.position}</div>
        </div>
    )
}