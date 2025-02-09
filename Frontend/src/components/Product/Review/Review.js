import { useEffect, useRef, useState } from "react";
import { api } from "../../../axios";
import { useSelector } from "react-redux";

function Review({ productId }) {
    const [canReview, setCanReview] = useState();
    const user = useSelector(state => state.User.user);
    const [reviews, setReviews] = useState();
    const content = useRef();

    const getData = async () =>
        await api.get(`/review/all-reviews/${productId}`);

    // INITIAL WORK
    useEffect(() => {
        getData()
            .then((response) => {
                if (response.data.operation) {
                    setReviews(response.data.mydata);
                    content.current.value = "";
                }
            })
            .catch((err) => console.log(err));
        console.log(user);
        if (user.role) {
            checkUser().then(res => {
                setCanReview(res.data.data);
            })
        }
    }, []);

    // ADD COMMENT
    const sendReview = async (e) => {
        e.preventDefault();
        const response = await api.post(
            `/review/addReview/${productId}`,
            { content: content.current.value },
            { headers: { Authorization: localStorage.getItem("token") } }
        );
        if (response.data.operation) {
            content.current.value = "";
            setReviews([...reviews]);
            console.log(reviews);
        }
    };

    const checkUser = async () => await api.get(`/review/can-review/${productId}`, { headers: { Authorization: localStorage.getItem('token') } })

    useEffect(() => {
        getData().then((res) => {
            if (res.data.operation) setReviews(res.data.mydata);
        });
    }, [reviews]);

    return (
        <div className="container mt-5">
            <div className="p-4 shadow-lg rounded" style={{ backgroundColor: "#e9f5e9" }}>
                <h4 className="text-success fw-bold text-center mb-4">
                    Reviews
                </h4>
                <div className="mb-4">
                    {reviews?.length ? reviews?.map((item, index) => (
                        <div
                            key={index}
                            className="p-3 mb-3 rounded"
                            style={{
                                backgroundColor: "#d4edda",
                                borderRadius: "15px",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                            }}
                        >
                            <div className="d-flex justify-content-between align-items-center">
                                <h6 className="fw-bold text-success mb-1">{item.user_id.name}</h6>
                                <small className="text-muted">{new Date(item?.publishedDate).toDateString()}</small>
                            </div>
                            <p className="text-dark mb-0">{item.content}</p>
                        </div>
                    )) : <p><strong>No Reviews Available Yet...</strong></p>}
                </div>
                {canReview && <form onSubmit={sendReview} className="d-flex flex-column">
                    <textarea
                        ref={content}
                        className="form-control mb-3"
                        placeholder="What do you think about this..."
                        rows="3"
                        required
                        style={{ resize: "none", borderRadius: "10px" }}
                    />
                    <button
                        type="submit"
                        className="btn btn-success align-self-end px-4 py-2"
                        style={{
                            backgroundColor: "#28a745",
                            border: "none",
                            borderRadius: "10px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                        }}
                    >
                        Post
                    </button>
                </form>}
            </div>
        </div>
    );
}

export default Review;