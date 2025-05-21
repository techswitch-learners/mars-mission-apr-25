import '@testing-library/jest-dom';
import PhotoOfTheDay from './photoOfTheDay'
import App from '../App'
import { render, waitFor } from '@testing-library/react';


describe (PhotoOfTheDay, ()=>{

    it ("Should render today's image", async ()=>{
        global.fetch = jest.fn(() =>
        Promise.resolve(
        new Response(
        JSON.stringify({
        hdurl: "https://apod.nasa.gov/apod/image/2505/IssTransit_Sanz_2569.jpg",
        title: "Astronomy Picture of the Day",
        explanation: "An amazing view of the International Space Station transiting the Sun.",
      })
    )))
        render(<PhotoOfTheDay/>)
        const testImage = document.querySelector("img") as HTMLImageElement;
        //expect(component).toContain(testImage);
        await waitFor(() => {
        expect(testImage).toHaveAttribute("src", "https://apod.nasa.gov/apod/image/2505/IssTransit_Sanz_2569.jpg");
    
})})
    
    it ("Should render fallback image", async ()=>{
        global.fetch = jest.fn(() =>
        Promise.resolve(
        new Response(
        JSON.stringify({
        title: "Astronomy Picture of the Day",
        explanation: "An amazing view of the International Space Station transiting the Sun.",
      })
    )))
        render(<PhotoOfTheDay/>)
        const testImage = document.querySelector("img") as HTMLImageElement;
        await waitFor(() => {
        expect(testImage).toBeInTheDocument;
    
})})

    })
