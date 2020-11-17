import React, {useState, Fragment} from 'react';
import Loader from './Loader';
import './ReviewForm.css';
import Modal from "./Modal";

function ReviewForm({selectedMovie, closeForm}) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [review, setReview] = useState('');
    const [errors, setErrors] = useState({});
    const [sendingInProgress, setSendingInProgress] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);

    //можно навесить на onCloseModal вместо closeForm()
    //Чтобы не закрывать форму, а очищать и давать оставить еше отзыв
    /*function clearForm() {
        setUsername('');
        setEmail('');
        setReview('');
        setErrors('');
        setIsOpenModal(false);
    }*/

    function handleValidation() {
        let errors = {};
        let formIsValid = true;

        //Name
        if (!username) {
            formIsValid = false;
            errors["username"] = "Can not be empty";
        } else if (!username.match(/^[a-zA-Z]+$/)) {
            formIsValid = false;
            errors["username"] = "Only letters allowed";
        }

        //Email
        if (!email) {
            formIsValid = false;
            errors["email"] = "Can not be empty";
        } else {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(String(email).toLowerCase())) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
            }
        }

        //Review
        if (!review) {
            formIsValid = false;
            errors["review"] = "Can not be empty";
        }

        setErrors(errors);
        return formIsValid;
    }

    function reviewSubmit(e) {
        e.preventDefault();
        if (handleValidation()) {
            setSendingInProgress(true);
            new Promise((resolve) => {
                setTimeout(resolve, 1000)
            }).then(resolve => {
                setSendingInProgress(false);
                setIsOpenModal(true);
            });
        }

    }

    return (
        <Fragment>
            <form className='ReviewForm' onSubmit={e => reviewSubmit(e)}>
                <h2>Live a review</h2>
                <div>
                    <p><label htmlFor='username'>Username</label></p>
                    <input type='text' name='username' value={username} onChange={e => setUsername(e.target.value)}/>
                    {errors['username'] ? <span>{errors['username']}</span> : ''}
                </div>
                <div>
                    <p><label htmlFor='email'>Email</label></p>
                    <input type='email' name='email' value={email} onChange={e => setEmail(e.target.value)}/>
                    {errors['email'] ? <span>{errors['email']}</span> : ''}
                </div>
                <div>
                    <p><label htmlFor='review'>Review</label></p>
                    <textarea type='textarea' name='review' value={review} onChange={e => setReview(e.target.value)}/>
                    {errors['review'] ? <span>{errors['review']}</span> : ''}
                </div>
                {Object.keys(errors).length ? <p><span>Please, correct errors and try again</span></p> : ''}
                {!sendingInProgress ?
                    <button type='submit' value="Submit">
                        Send
                    </button>
                    :
                    <Loader/>
                }
            </form>
            {!!isOpenModal ? <Modal
                username={username}
                email={email}
                review={review}
                onCloseModal={() => closeForm()}
            /> : ''}
        </Fragment>
    );
}

export default ReviewForm;
