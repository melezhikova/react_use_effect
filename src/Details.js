import { useEffect, useState } from "react";

export default function Details (props) {
    const { info } = props;
    const [id, setId] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        setId(prevId => prevId === info.id ? prevId : info.id);
    }, [info]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_LIST_URL}${id}.json`)
        .then(response=>response.json())
        .then(data => {
            setData(data)
            console.log(data);
        })
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