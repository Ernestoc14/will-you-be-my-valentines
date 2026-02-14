"use client";
import { useEffect, useRef, useState } from "react";
import "./page.css";
import Image from "next/image";

export default function Page() {
    const envelopeRef = useRef<HTMLDivElement | null>(null);
    const heartsRef = useRef<HTMLDivElement | null>(null);
    const yayRef = useRef<HTMLDivElement | null>(null);
    const noBtnRef = useRef<HTMLButtonElement | null>(null);
    const [opened, setOpened] = useState(false);
    const speedRef = useRef(500);

    useEffect(() => {
        const envelope = envelopeRef.current;
        const yesBtn = document.getElementById("yesBtn");
        const noBtn = noBtnRef.current;
        const heartsContainer = heartsRef.current;
        const yayContainer = yayRef.current;

        if (!envelope || !yesBtn || !noBtn || !heartsContainer || !yayContainer)
            return;

        const createHeart = () => {
            const heart = document.createElement("div");
            heart.className = "heart";
            heart.innerHTML = "❤";
            heart.style.left = Math.random() * 100 + "%";
            heart.style.animationDelay = Math.random() * 2 + "s";
            heartsContainer.appendChild(heart);
            setTimeout(() => heart.remove(), 3000);
        };

        const handleEnvelopeClick = () => {
            if (!opened) {
                envelope.classList.add("open");
                setOpened(true);
            }
        };

        const handleYesClick = () => {
            envelope.style.display = "none";
            heartsContainer.style.display = "none";
            yayContainer.style.display = "flex";
            setInterval(createHeart, 300);
        };

        const handleNoHover = () => {
            const maxX = window.innerWidth - noBtn.offsetWidth;
            const maxY = window.innerHeight - noBtn.offsetHeight;
            const x = Math.min(maxX, Math.max(0, Math.random() * maxX));
            const y = Math.min(maxY, Math.max(0, Math.random() * maxY));

            noBtn.style.transition = `all ${speedRef.current}ms ease`;
            noBtn.style.position = "fixed";
            noBtn.style.left = x + "px";
            noBtn.style.top = y + "px";

            speedRef.current = Math.max(100, speedRef.current - 50);
        };

        envelope.addEventListener("click", handleEnvelopeClick);
        yesBtn.addEventListener("click", handleYesClick);
        noBtn.addEventListener("mouseover", handleNoHover);

        const heartInterval = setInterval(createHeart, 500);

        return () => {
            envelope.removeEventListener("click", handleEnvelopeClick);
            yesBtn.removeEventListener("click", handleYesClick);
            noBtn.removeEventListener("mouseover", handleNoHover);
            clearInterval(heartInterval);
        };
    }, [opened]);

    return (
        <div className="flex justify-center">
            <div className="envelope" ref={envelopeRef}>
                <div className="envelope-front caveat-1">
                    For Ally!
                    <div className="stamp"></div>
                </div>

                <div className="card">
                    <div className="container">
                        <h1>
                            Will You <br />
                            Be My <br />
                            Valentine?
                        </h1>

                        <div className="buttons">
                            <button id="yesBtn">YES!</button>
                            <button id="noBtn" ref={noBtnRef}>
                                no
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hearts" ref={heartsRef}></div>

            <div id="yay-container" ref={yayRef}>
                <Image src="/chimuelo.jpg" alt="Celebration Image" width={300} height={130}/>
                <h2>
                    lesgo! <br />
                    (i wuv you baby!)
                </h2>
            </div>
        </div>
    );
}
