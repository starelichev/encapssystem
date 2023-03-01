import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import scheme from "../Images/main.png";
import waterPart1 from "../Images/water1.png";
import waterPart2 from "../Images/water2.png";
import waterPart3 from "../Images/water3.png";
import waterPart4 from "../Images/water4.png";
import pipes from "../Images/pipes.png";
import boilerFirst from "../Images/firefirst.png";
import boilerSecond from "../Images/firesecond.png";
import boilerThird from "../Images/firethird.png";
import styles from "./ShemePage.module.css";
import {Image} from "antd";

const SchemePage = () => {
    const params = useSelector(state => state.params.params);

    const FetchWaterParam = params.filter(param => param.device_id === "14784365")[0]?.value;
    const[waterParam, setWaterParam] = useState("");
    useEffect(() => {
        if (FetchWaterParam === "1") {
            setWaterParam(waterPart1)
        }
        if (FetchWaterParam === "2") {
            setWaterParam(waterPart2)
        }
        if (FetchWaterParam === "3") {
            setWaterParam(waterPart3)
        }
        if (FetchWaterParam === "4") {
            setWaterParam(waterPart4)
        }
        if (FetchWaterParam === "0") {
            setWaterParam("")
        }
    }, [FetchWaterParam])

    const FetchBoilerFirst = params.filter(param => param.device_id === "15270213")[0]?.value;
    const[boilerFirstParam, setBoilerFirstParam] = useState("");
    useEffect(() => {
        if (FetchBoilerFirst > "0") {
            setBoilerFirstParam(boilerFirst)
        }
        else {
            setBoilerFirstParam("")
        }
    }, [FetchBoilerFirst])

    const FetchBoilerSecond= params.filter(param => param.device_id === "15270219")[0]?.value;
    const[boilerSecondParam, setBoilerSecondParam] = useState("");
    useEffect(() => {
        if (FetchBoilerSecond > "0") {
            setBoilerSecondParam(boilerSecond)
        }
        else {
            setBoilerSecondParam("")
        }
    }, [FetchBoilerSecond])

    const FetchBoilerThird= params.filter(param => param.device_id === "15270231")[0]?.value;
    const[boilerThirdParam, setBoilerThirdParam] = useState("");
    useEffect(() => {
        if (FetchBoilerThird > "0") {
            setBoilerThirdParam(boilerThird)
        }
        else {
            setBoilerThirdParam("")
        }
    }, [FetchBoilerThird])

    return (
        <div className={styles.divStyle}>
            <Image src={scheme} preview={false}/>
            <Image src={pipes} preview={false} rootClassName={styles.addImg}/>
            <Image src={waterParam} preview={false} rootClassName={styles.addImg}/>
            <Image src={boilerFirstParam} preview={false} rootClassName={styles.addImg}/>
            <Image src={boilerSecondParam} preview={false} rootClassName={styles.addImg}/>
            <Image src={boilerThirdParam} preview={false} rootClassName={styles.addImg}/>
        </div>
    );
};

export default SchemePage;