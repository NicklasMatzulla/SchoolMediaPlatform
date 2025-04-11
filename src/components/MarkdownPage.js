import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useParams } from "react-router-dom";
import Button from "./button/Button";
import ClozeText from "./clozetext/ClozeTest";
import AudioPlayer from "./audioplayer/AudioPlayer";
import MultiChoice from "./multichoice/MultiChoice";
import VideoPlayer from "./videoplayer/VideoPlayer";

const components = {
    Button: ({ args }) => <Button href={args[1]}>{args[0]}</Button>,
    ClozeText: ({ args }) => <ClozeText args={args} />,
    AudioPlayer: ({ args }) => <AudioPlayer args={args} />,
    MultiChoice: ({ args }) => <MultiChoice args={args} />,
    VideoPlayer: ({ args }) => <VideoPlayer args={args} />,
};

const MarkdownPage = () => {
    const { page } = useParams();
    const [content, setContent] = useState("");

    useEffect(() => {
        fetch(`/pages/${page}.md`)
            .then((res) => res.text())
            .then((text) => setContent(text))
            .catch(() => setContent("# Error al cargar la página"));
    }, [page]);

    const parseComponents = (text) => {
        const componentRegex = /\{([A-Za-z0-9_]+)\s*([^}]*)}/g;
        const parts = [];
        let lastIndex = 0;

        text.replace(componentRegex, (match, name, argsString, offset) => {
            parts.push(text.slice(lastIndex, offset));
            lastIndex = offset + match.length;

            const args = argsString ? argsString.match(/"([^"]+)"/g)?.map(arg => arg.replace(/"/g, "")) : [];

            if (components[name]) {
                parts.push(React.createElement(components[name], { args, key: offset }));
            } else {
                parts.push(`⚠️ Componente desconocido: ${name}`);
            }
        });

        parts.push(text.slice(lastIndex));
        return parts;
    };

    return (
        <div className="content">
            {parseComponents(content).map((part, index) =>
                typeof part === "string" ? (
                    <ReactMarkdown key={index} remarkPlugins={[remarkGfm]}>
                        {part}
                    </ReactMarkdown>
                ) : (
                    part
                )
            )}
        </div>
    );
};

export default MarkdownPage;
