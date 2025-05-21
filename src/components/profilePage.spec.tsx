import '@testing-library/jest-dom';
import ProfilePage from './ProfilePage'
import { render, waitFor, screen, fireEvent} from '@testing-library/react';
import React from 'react';
import Slider from "react-slick";

describe('ProfilePage', () => {
    it('renders the name input', () => {
        render(<ProfilePage />);
        const nameInputField = screen.getByLabelText(/Name:/i);
        expect(nameInputField).toBeInTheDocument();
        fireEvent.change(nameInputField, {target: {value: 'Beth'}})
        fireEvent.click(screen.getByAltText(/clickable picture of mars/i));
        expect(screen.getByText(/Beth/)).toBeInTheDocument();
    });
});
