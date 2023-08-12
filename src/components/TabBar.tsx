import React from 'react';

interface TabBarProps {
  activeTab: 'nowPlaying' | 'topRated';
  onTabChange: (tab: 'nowPlaying' | 'topRated') => void;
}

const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="tab-bar">
      <button
        onClick={() => onTabChange('nowPlaying')}
        className={activeTab === 'nowPlaying' ? 'active' : ''}
      >
        Now Playing
      </button>
      <button
        onClick={() => onTabChange('topRated')}
        className={activeTab === 'topRated' ? 'active' : ''}
      >
        Top Rated
      </button>
    </div>
  );
};

export default TabBar;
