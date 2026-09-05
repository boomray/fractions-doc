export const THEME_STORAGE_KEY = "fractions-docs:theme";

/**
 * Runs in `<head>` before the body is painted. The stored preference wins;
 * first-time visitors get light mode (the site is light-first; the OS dark
 * preference is not followed until the visitor toggles).
 */
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(t!=="light"&&t!=="dark"){t="light"}var r=document.documentElement;r.setAttribute("data-theme",t);r.style.colorScheme=t;var m=document.getElementById("fractions-theme-color");if(m){m.setAttribute("content",t==="light"?"#f4f4f4":"#0d0d0d")}}catch(e){}})()`;
