import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
    const [links, setLinks] = useState([]);

    useEffect(() => {
        fetch("/navigation.md")
            .then((res) => res.text())
            .then((text) => {
                const parsedLinks = text.split("\n").map((line) => {
                    const match = line.match(/\[([^\]]+)]\(([^)]+)\)/);
                    return match ? { name: match[1], path: match[2] } : null;
                }).filter(Boolean);
                setLinks(parsedLinks);
            });
    }, []);

    return (
        <nav className="sidebar">
            <h3>Medio ambiente</h3>
            <ul>
                {links.map((link, index) => (
                    <li key={index}>
                        <Link to={link.path}>{link.name}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Sidebar;