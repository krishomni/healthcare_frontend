    import React from "react";
    import "./HeroSubNav.css";

    export default function HeroSubNav() {
    return (
        <nav className="hero-subnav">
        <ul>
            <li><a href="/#services">Services</a></li>
            <li><a href="/#portfolio">Our Work</a></li>
            <li><a href="/#contact">Contact</a></li>
        </ul>
        </nav>
    );
    }