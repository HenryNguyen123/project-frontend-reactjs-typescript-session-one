import React from "react"
import './loading.scss'

const LoadingComponent: React.FC = () => {

    return (
        <>
            <div className="loading-container">
                <div className="loading-content">
                    <div className="loading-item">
                        <div className="text-center">
                            <button className="btn btn-secondary" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Loading...
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
} 

export default LoadingComponent