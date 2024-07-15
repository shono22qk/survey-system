import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function SurveyResults() {
  const [survey, setSurvey] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchSurvey = async () => {
      const res = await axios.get(`https://survey-system-jhjx.onrender.com/api/surveys/${id}')