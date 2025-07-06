import React, { useEffect, useState } from 'react';
import NewsService from '../services/newsService';

const NewsSection: React.FC = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    NewsService.fetchHealthNews()
      .then((articles) => {
        if (isMounted) {
          setNews(articles);
          setLoading(false);
        }
      })
      .catch((err) => {
        setError('Failed to load news.');
        setLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  return (
    <section className="features-section" style={{

      paddingBottom: '2em',
      margin: '2rem 0' ,
      
  
    }}>
      <div className="features-container">
        <div className="features-header">
          <h2 className="features-title">Latest Health News</h2>
          <p className="features-description">
            Stay updated with the most recent health news and outbreak reports from trusted sources.
          </p>
        </div>
        {loading && <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>Loading health news...</div>}
        {error && <div style={{ color: 'red', textAlign: 'center', padding: '2rem' }}>{error}</div>}
        {!loading && !error && news.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
            <p>News API key is missing. Please add VITE_NEWS_API_KEY to your .env file to see health news.</p>
            <p style={{ fontSize: '0.9rem', marginTop: '1rem' }}>
              Get your free API key from: <a href="https://newsapi.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>newsapi.org</a>
            </p>
          </div>
        )}
        <div className="features-grid">
          {news.slice(0, 6).map((article, idx) => (
            <a
              key={idx}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="feature-card"
              style={{ textDecoration: 'none', color: 'inherit', height: '100%' }}
            >
              <div className="feature-card-content">
                <div className="feature-icon-container feature-gradient-orange" style={{ marginBottom: 0, marginTop: 8 }}>
                  <span role="img" aria-label="news" style={{ fontSize: '1.5rem', color: 'white' }}>📰</span>
                </div>
                <h3 className="feature-title" style={{ fontSize: '1.1rem' }}>{article.title}</h3>
                <p className="feature-description" style={{ fontSize: '0.98rem', margin: '8px 0' }}>{article.description}</p>
                <div style={{ fontSize: '0.9rem', color: '#888', marginTop: 'auto' }}>
                  {article.source} &middot; {new Date(article.publishedAt).toLocaleDateString()}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection; 