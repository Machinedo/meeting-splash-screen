# Splash Screen for Meetings

![Splash Screen](/assets/favicon.ico)

A simple splash page that can be used while waiting for a meeting to start, with an optional countdown timer setting available in the control panel.

## Description

This web app creates a basic splash screen for meetings. It's a straightforward web page designed to inform visitors that a meeting will begin shortly. Additionally, there are options that  can be enabled through the control panel.

## Usage

You can use this splash screen for various purposes:

- Display it on a projector or screen before a meeting starts to let participants know the meeting will begin shortly.
- Customize it to match your brand or theme by modifying the CSS and content.
- Optionally, activate a countdown timer by uncommenting the code in the control panel.

## Installation

There are no specific installation instructions for this splash screen. You can simply download the HTML file and any associated assets (CSS and JavaScript) to your web server and access it through a web browser.

```html
<!DOCTYPE html>
<html lang="en">
    <!-- ... (the rest of your HTML code) ... -->
</html>
```

## Dependencies

This splash screen relies on the following libraries and resources:

- [p5.js](https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js): A JavaScript library for creative coding and interactive graphics.
- [p5.sound.js](https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/addons/p5.sound.min.js): An addon for p5.js that provides audio functionality.
- [anime.js](https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js): A JavaScript animation library.

These dependencies are loaded from content delivery networks (CDNs) for ease of use.

## Customization

To customize this splash screen:

1. Modify the content within the `<body>` tag to add your own message or branding elements.
2. Adjust the CSS styles in the provided `reset.css` and `index.css` files to match your desired appearance.
3. Using the control panel,
    1. Enable the countdown timer using control panel.
    2. Enable heading text from control panel.
    3. Enable rotation of background images based on the chosen theme.
    4. Enable radio based on the chosen genre.
    5. Change the audio visualizer

## License

This splash screen template is provided under an open-source license. Feel free to use and modify it for your needs.

---

**Note:** This readme provides an overview of the HTML file provided. Please refer to the HTML file and associated assets for more detailed information and customization options.