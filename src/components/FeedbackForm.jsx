import { useState } from 'react';
import Rating from './Rating';
import Button from './shared/Button';
import Card from './shared/Card';

const FeedbackForm = ({ handleAdd }) => {
	const [text, setText] = useState('');
	const [rating, setRating] = useState();
	const [btnDisabled, setBtnDisabled] = useState(true);
	const [message, setMessage] = useState('');

	const handleTextChange = (e) => {
		if (text === '') {
			setBtnDisabled(true);
			setMessage(null);
		} else if (text !== '' && text.trim().length <= 10) {
			setMessage('Text you enter MUST be at least 10 characters');

			setBtnDisabled(true);
		} else {
			setMessage(null);
			setBtnDisabled(false);
		}

		setText(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (text.trim().length > 10) {
			const newFeedback = {
				text,
				rating,
			};
			handleAdd(newFeedback);

			setText('');
		}
	};

	return (
		<Card>
			<form onSubmit={handleSubmit}>
				<h2>Please rate your service and share it with us.</h2>
				<Rating select={(rating) => setRating(rating)} />
				<div className='input-group'>
					<input
						onChange={handleTextChange}
						type='text'
						placeholder='Write a review'
						value={text}
					/>
					<Button type='submit' isDisabled={btnDisabled}>
						Send
					</Button>
				</div>
				{message && <div className='message'>{message}</div>}
			</form>
		</Card>
	);
};

export default FeedbackForm;
