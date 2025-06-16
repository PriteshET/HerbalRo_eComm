import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Search, Mail, User, Calendar, Star } from "lucide-react";
import "./FeedbackTab.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const FeedbackTab = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/admin/feedback', { withCredentials: true })
      .then(response => {
        if (response.data.success) {
          setFeedbacks(response.data.data);
        }
      })
      .catch(error => {
        console.error('Error fetching feedback:', error);
      });

      axios.get("http://localhost:3001/admin", { withCredentials: true })
        .then(res => {
          if (!res.data.success) {
            toast.error("Unauthorized. Redirecting...");
            navigate('/login');
          }
        })
        .catch(() => {
          toast.error("Access denied.");
          navigate('/login');
        });
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const filteredFeedbacks = feedbacks.filter(feedback =>
    feedback.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feedback.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feedback.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'rating-high';
    if (rating >= 3) return 'rating-medium';
    return 'rating-low';
  };

  const truncateFeedback = (text, maxWords = 5) => {
    const words = text.split(' ');
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + '...';
  };

  return (
    <div className="space-y-6">
      <ToastContainer/>
        <div className="feedback-header">
        <h2 className="feedback-title">Customer Feedback</h2>
        <div className="feedback-count">
            <MessageSquare color="#1f3521" />
            <span className="feedback-count-text">{feedbacks.length} Feedbacks</span>
        </div>
      </div>

      {/* Search Bar */}
      <Card className="search-card">
        <CardContent >
             <div className="search-container">
            <Search className="search-icon" />
            <Input
              placeholder="Search by name, email, or feedback content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
               className="search-input"
            />
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <Card className="feedcard">
            <CardContent className="stat-card-content">
            <MessageSquare className="stat-icon text-blue-600" />
            <div>
              <p className="stat-text">Total Feedback</p>
              <p className="stat-number">{feedbacks.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="feedcard">
             <CardContent className="stat-card-content">
            <Star className="stat-icon text-yellow-500" />
            <div>
              <p className="stat-text">Avg Rating</p>
              <p className="stat-number">
                {feedbacks.length === 0 ? "0.0" : (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="feedcard">
              <CardContent className="stat-card-content">
            <Star className="stat-icon text-green-500" />
            <div>
              <p className="stat-text">5-Star Reviews</p>
              <p className="stat-number">
                {feedbacks.filter(f => f.rating === 5).length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="feedcard">
             <CardContent className="stat-card-content">
            <MessageSquare className="stat-icon text-purple-600" />
            <div>
              <p className="stat-text">This Month</p>
              <p className="stat-number">
                {feedbacks.filter(f => new Date(f.date).getMonth() === new Date().getMonth()).length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feedback Detail Modal */}
      {selectedFeedback && (
        <Card className="feedback-detail-modal">
          <CardHeader>
            <CardTitle className="feedback-detail-header">
              <span className="feedback-detail-title">Feedback Details</span>
              <Button
                onClick={() => setSelectedFeedback(null)}
                variant="outline"
                size="sm"
              >
                Close
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
                <div className="feedback-detail-grid">
                <div>
                    <p className="feedback-detail-label">Customer Name</p>
                  <p className="feedback-detail-value">{selectedFeedback.name}</p>
                </div>
                <div>
                    <p className="feedback-detail-label">Email</p>
                  <p className="feedback-detail-value">{selectedFeedback.email}</p>
                </div>
              </div>
              <div className="feedback-detail-field">
                <p className="feedback-detail-label">Rating</p>
                <div className="rating-stars">
                  {getRatingStars(selectedFeedback.rating)}
                  <span className="rating-text">({selectedFeedback.rating}/5)</span>
                </div>
              </div>
               <div className="feedback-detail-field">
                <p className="feedback-detail-label">Feedback Message</p>
                <p className="feedback-message-container">
                  {selectedFeedback.message}
                </p>
              </div>
              <div className="feedback-detail-field">
                <p className="feedback-detail-label">Submitted</p>
                <p className="feedback-detail-value">{formatDate(selectedFeedback.date)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Feedback List */}
      <Card className="table-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
             <table className="feedback-table">
              <thead className="table-header">
                <tr>
                  <th className="table-header-cell">Customer</th>
                  <th className="table-header-cell">Rating</th>
                  <th className="table-header-cell">Feedback</th>
                  <th className="table-header-cell">Date</th>
                  <th className="table-header-cell">Actions</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {filteredFeedbacks.map((feedback) => (
                    <tr key={feedback._id} className="table-row">
                    <td className="table-cell">
                      <div className="customer-info">
                        <User className="customer-avatar" />
                        <div className="customer-details">
                          <div className="customer-name">{feedback.name}</div>
                          <div className="customer-email">
                            <Mail className="email-icon" />
                            {feedback.email}
                          </div>
                        </div>
                      </div>
                    </td>
                     <td className="table-cell">
                      <div className="rating-container">
                        <div className="rating-stars">
                          {getRatingStars(feedback.rating)}
                        </div>
                        <span className={`rating-badge ${getRatingColor(feedback.rating)}`}>
                          {feedback.rating}/5
                        </span>
                      </div>
                    </td>
                     <td className="table-cell">
                      <div className="feedback-preview">
                        {truncateFeedback(feedback.message)}
                      </div>
                    </td>
                     <td className="table-cell">
                      <div className="date-container">
                        <Calendar className="date-icon" />
                        {formatDate(feedback.date)}
                      </div>
                    </td>
                     <td className="table-cell">
                      <Button
                        onClick={() => setSelectedFeedback(feedback)}
                        size="sm"
                        variant="outline"
                        className="view-details-btn"
                      >
                        <MessageSquare className="view-details-icon" />
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredFeedbacks.length === 0 && (
                 <div className="empty-state">
                <MessageSquare className="empty-state-icon" />
                <h3 className="empty-state-title">No feedback found</h3>
                <p className="empty-state-description">
                  {searchTerm ? 'Try adjusting your search terms.' : 'No customer feedback available yet.'}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackTab;