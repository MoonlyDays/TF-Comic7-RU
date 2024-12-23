import TF2Logo from "./assets/tf_logo.png";
import Title from "./assets/title.png";
import "./index.css";
import {useEffect, useMemo, useState} from "react";
import {comicImageUrl, parseHash} from "./helpers.ts";
import {useLocation} from "react-router-dom";
import {useKeyPress} from "./useKeyPress.ts";

import.meta.glob("./assets/pages/*.png");

function App() {
    const {hash} = useLocation();

    const [currentPage, setCurrentPage] = useState(1);
    const currentImageUrl = useMemo(() => comicImageUrl(currentPage), [currentPage]);
    const nextImageUrl = useMemo(() => comicImageUrl(currentPage + 1), [currentPage]);

    const nextPage = () => {
        gotoPageHash(currentPage + 1);
    }

    const prevPage = () => {
        gotoPageHash(currentPage - 1);
    }

    const gotoPageHash = (page: number) => {
        location.hash = `#${page}`;
    }

    useEffect(() => {
        const page = parseHash(hash);
        if (page < 1 || page > 330) {
            gotoPageHash(currentPage);
            return;
        }

        setCurrentPage(page);
    }, [hash]);

    useKeyPress(nextPage, [' ', 'ArrowRight', 'Enter'])
    useKeyPress(prevPage, ['ArrowLeft'])

    return (
        <div className="w-full max-w-5xl">
            <div className="flex h-28 items-center justify-between">
                <img src={TF2Logo} alt="Team Fortress 2 Logo"/>
                <img src={Title} alt="The Days Have Worn Away"/>
            </div>
            <div className="h-[48rem] w-full overflow-hidden" onClick={nextPage}>
                {currentImageUrl && (
                    <img
                        className="object-contain w-full h-full cursor-pointer"
                        alt="Comic Reader"
                        src={currentImageUrl}
                    />
                )}
                {nextImageUrl && (
                    <img
                        alt="Hidden Preload"
                        src={nextImageUrl}
                        className="w-0 h-0"
                    />
                )}
            </div>

            <div className="mb-16 mt-8 flex flex-col items-center gap-8 text-white">
                <div
                    className="flex h-[72px] w-[600px] items-center justify-center bg-[url(./assets/infobar.png)] font-sans text-xl">
                    Жмите на картинку или на пробел для перехода дальше
                </div>

                <div className="flex flex-col gap-4 text-center">
                    <div>
                        <p>
                            Оригинал:{" "}
                            <a
                                href="https://www.teamfortress.com/tf07_thedayshavewornaway/"
                                className="text-amber-500"
                            >
                                teamfortress.com/tf07_thedayshavewornaway
                            </a>
                            . Авторы перевода: Alabes,{" "}
                            <a href="https://t.me/moonlygroup" className="text-amber-500">
                                Moonly Days
                            </a>
                            .
                        </p>
                        <p>
                            Это фанатский перевод. Мы не связаны с Valve Corporation или
                            порталом &quot;Авторский Комикс&quot;.
                        </p>
                    </div>
                    <div className="text-gray-400">
                        <p>
                            &copy; Valve Corporation, Team Fortress 2, комикс &quot;The Days Have
                            Worn Away&quot;, 2024
                        </p>
                        <p>&copy; Alabes, перевод текстов, 2024</p>
                        <p>&copy; Moonly Days, издание и платформа, 2024</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
