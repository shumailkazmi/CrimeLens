# CrimeLens — AI Image Caption Generator

React frontend for CrimeLens, a final year project (BS Software Engineering, FAST NUCES Lahore, 2024–25) that generates descriptive captions for images using fine-tuned vision-language models.

> **This repository is the frontend only.** The model service and API are separate.

## The project

Three vision-language models — **CLIP**, **BLIP** and **FLAVA** — were fine-tuned for visual feature extraction and caption generation, improving baseline accuracy by **over 15%** on a curated **50,000-image** dataset.

Predictions are served through Flask and FastAPI, with MongoDB for storage. The full system is containerised with Docker.

## What's in here

A React single-page app covering the user-facing side:

| Screen | File |
|---|---|
| Landing page | `src/components/LandingPage.js` |
| Sign up / log in | `src/signup.js`, `src/login.js` |
| Caption generation | `src/mainpage.js` |
| Caption history | `src/history.js` |

Built with React Router for navigation, styled-components for styling, and Framer Motion for transitions.

## Running locally

```bash
npm install
npm start
```

Opens on `http://localhost:3000`. Requires the model API running separately.

## Stack

`React` · `React Router` · `styled-components` · `Framer Motion` · `Create React App`
