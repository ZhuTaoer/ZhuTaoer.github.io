/**
 * 简历页面增强脚本
 * 用于在about页面动态渲染和展示简历信息
 * 包括基本信息、工作经历、研究成果、技能展示等
 */

(function() {
  'use strict';

  // 简历数据渲染函数
  const ResumeRenderer = {
    
    // 初始化简历展示
    init: function() {
      // 检查是否为about页面
      if (!document.body.classList.contains('page') || 
          !document.getElementById('post')) {
        return;
      }

      // 获取about数据（从HTML属性或全局变量）
      const resumeData = this.getResumeData();
      if (!resumeData) {
        return;
      }

      // 渲染各个部分
      this.renderBasicInfo(resumeData);
      this.renderWorkExperience(resumeData);
      this.renderResearch(resumeData);
      this.renderExpertise(resumeData);
    },

    // 获取简历数据
    getResumeData: function() {
      // 尝试从页面数据属性获取
      const pageData = document.querySelector('[data-resume-data]');
      if (pageData) {
        try {
          return JSON.parse(pageData.getAttribute('data-resume-data'));
        } catch (e) {
          console.warn('Failed to parse resume data');
        }
      }
      return null;
    },

    // 渲染基本信息
    renderBasicInfo: function(data) {
      if (!data.basicInfo) return;

      const basicInfo = data.basicInfo;
      let html = '<div class="basic-info-card">';
      html += '<h3>📋 基本信息</h3>';
      
      if (data.name) {
        html += `<div class="basic-info-item"><strong>姓名：</strong> ${data.name}</div>`;
      }
      if (basicInfo.gender) {
        html += `<div class="basic-info-item"><strong>性别：</strong> ${basicInfo.gender}</div>`;
      }
      if (basicInfo.location) {
        html += `<div class="basic-info-item"><strong>地址：</strong> ${basicInfo.location}</div>`;
      }
      if (basicInfo.email) {
        html += `<div class="basic-info-item"><strong>邮箱：</strong> <a href="mailto:${basicInfo.email}">${basicInfo.email}</a></div>`;
      }
      if (basicInfo.phone) {
        html += `<div class="basic-info-item"><strong>电话：</strong> ${basicInfo.phone}</div>`;
      }
      if (basicInfo.github) {
        html += `<div class="basic-info-item"><strong>GitHub：</strong> <a href="${basicInfo.github}" target="_blank">${basicInfo.github}</a></div>`;
      }

      html += '</div>';

      // 插入到页面
      const insertPoint = document.querySelector('#post-content') || 
                         document.querySelector('.post-content') ||
                         document.querySelector('main');
      
      if (insertPoint) {
        insertPoint.insertAdjacentHTML('afterbegin', html);
      }
    },

    // 渲染工作经历
    renderWorkExperience: function(data) {
      if (!data.workExperience || !data.workExperience.list) return;

      let html = '<div class="resume-section">';
      html += '<h3>💼 工作经历</h3>';

      data.workExperience.list.forEach(item => {
        html += '<div class="experience-item">';
        html += `<div class="experience-title">${item.position}</div>`;
        html += `<div class="experience-period">${item.period}</div>`;
        html += `<div class="experience-desc">${item.description}</div>`;
        html += '</div>';
      });

      html += '</div>';

      const insertPoint = document.querySelector('#post-content') || 
                         document.querySelector('.post-content') ||
                         document.querySelector('main');
      
      if (insertPoint) {
        insertPoint.insertAdjacentHTML('beforeend', html);
      }
    },

    // 渲染研究成果
    renderResearch: function(data) {
      if (!data.research) return;

      let html = '<div class="resume-section">';
      html += '<h3>🔬 研究成果</h3>';

      // 论文
      if (data.research.papers && data.research.papers.length > 0) {
        html += '<h4 style="margin-top: 20px; margin-bottom: 10px; color: #667eea;">📄 发表论文</h4>';
        data.research.papers.forEach(paper => {
          html += '<div class="paper-item">';
          html += `<div class="paper-title">${paper.title}</div>`;
          html += `<div class="paper-info paper-authors">作者: ${paper.authors}</div>`;
          html += `<div class="paper-info">期刊: ${paper.journal}</div>`;
          html += `<div class="paper-info">年份: ${paper.year}</div>`;
          if (paper.status) {
            html += `<span class="paper-status">${paper.status}</span>`;
          }
          html += '</div>';
        });
      }

      // 奖项
      if (data.research.awards && data.research.awards.length > 0) {
        html += '<h4 style="margin-top: 20px; margin-bottom: 10px; color: #667eea;">🏆 获得奖项</h4>';
        html += '<div style="margin: 10px 0;">';
        data.research.awards.forEach(award => {
          html += '<span class="award-item">';
          html += `${award.award}`;
          html += `<span class="award-date">${award.date}</span>`;
          html += '</span>';
        });
        html += '</div>';
      }

      html += '</div>';

      const insertPoint = document.querySelector('#post-content') || 
                         document.querySelector('.post-content') ||
                         document.querySelector('main');
      
      if (insertPoint) {
        insertPoint.insertAdjacentHTML('beforeend', html);
      }
    },

    // 渲染技能专长
    renderExpertise: function(data) {
      if (!data.expertise || !data.expertise.skills) return;

      let html = '<div class="resume-section">';
      html += '<h3>💡 技能专长</h3>';

      data.expertise.skills.forEach(skill => {
        html += '<div class="skill-category">';
        html += `<div class="skill-category-name">${skill.category}</div>`;
        html += '<div class="skill-tags">';
        
        skill.items.split(/,|、|；/).forEach(item => {
          const trimmed = item.trim();
          if (trimmed) {
            html += `<span class="skill-tag">${trimmed}</span>`;
          }
        });

        html += '</div></div>';
      });

      html += '</div>';

      const insertPoint = document.querySelector('#post-content') || 
                         document.querySelector('.post-content') ||
                         document.querySelector('main');
      
      if (insertPoint) {
        insertPoint.insertAdjacentHTML('beforeend', html);
      }
    }
  };

  // 页面加载时初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      ResumeRenderer.init();
    });
  } else {
    ResumeRenderer.init();
  }

  // 导出到全局作用域（便于调试）
  window.ResumeRenderer = ResumeRenderer;

})();
