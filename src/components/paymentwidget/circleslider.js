function CircleSlider({ paymentInfo }) {
    return (
        <input type="range" className="c-rng" min="0" max="360" step="1" value="75" data-range="circular" />
    )
}

export default CircleSlider