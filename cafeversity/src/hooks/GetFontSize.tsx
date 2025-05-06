// "use client";
//
// import { useEffect } from "react";
// import useFontSizeSet from "./fontSizeSet";
//
// const GetFontSize = () => {
//     const [, setFontSize] = useFontSizeSet();
//
//     useEffect(() => {
//         if (typeof window !== 'undefined') {
//             const fontFamily = localStorage.getItem("common_font_size");
//             if (fontFamily) {
//                 setFontSize(fontFamily);
//             }
//         }
//     }, [setFontSize]);
//
//     return null;
// };
//
// export default GetFontSize;
