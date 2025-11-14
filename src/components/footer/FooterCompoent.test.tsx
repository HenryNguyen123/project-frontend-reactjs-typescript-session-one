import { render, screen } from '@testing-library/react'
import FooterComponent from './FooterComponent';

test('renders UserComponent correctly', async () => {
    render(<FooterComponent />);
    expect(await screen.findByText('Subscribe to our newsletter')).toBeInTheDocument()
})