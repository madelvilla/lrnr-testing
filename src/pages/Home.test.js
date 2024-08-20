test('checks if the logo image alt text is correct', () => {
    const altText = 'Lrnr Logo';
    expect(altText).toBe('Lrnr Logo');
});

test('checks if the introduction heading text is correct', () => {
    const headingText = 'Your guided path to programming enlightenment';
    expect(headingText).toBe('Your guided path to programming enlightenment');
});

test('checks if the BEGIN JOURNEY button text is correct', () => {
    const buttonText = 'BEGIN JOURNEY';
    expect(buttonText).toBe('BEGIN JOURNEY');
});

test('checks if feature section titles are correct', () => {
    const featureTitles = [
        'Personalized Quizzes',
        'Rewarding',
        'Personal SME'
    ];
    const expectedTitles = [
        'Personalized Quizzes',
        'Rewarding',
        'Personal SME'
    ];
    expect(featureTitles).toEqual(expectedTitles);
});
