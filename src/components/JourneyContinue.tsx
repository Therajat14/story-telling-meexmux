"use client";

import { forwardRef } from "react";
import JourneyContinueChapter from "./chapters/JourneyContinueChapter";

interface JourneyContinueProps {}

const JourneyContinue = forwardRef<HTMLElement, JourneyContinueProps>(
    ({}, ref) => {
        return <JourneyContinueChapter darkMode={false} />;
    }
);

JourneyContinue.displayName = "JourneyContinue";
export default JourneyContinue;