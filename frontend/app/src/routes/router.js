import React from "react"

import Path from "./path"
import {Welcome} from "../components/Welcome.js"
import {Wallet} from "../components/Wallet"
import {Candidat} from "../components/Candidat"
import {Vot} from "../components/Vot"

const routes = [
    { path: Path.WELCOME, element: <Welcome /> },
    { path: Path.WALLET, element: <Wallet /> },
    { path: Path.HOME, element: <Welcome /> },
    { path: Path.VOT, element: <Vot /> },
    { path: Path.CANDIDAT, element: <Candidat /> },
]

export default routes