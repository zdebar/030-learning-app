CREATE OR REPLACE FUNCTION public.subject_overview(user_id UUID, subject_id INT)
RETURNS JSON AS $$
WITH chapters_data AS (
  SELECT
    ch.id,
    ch.name AS chapter,
    ch.position,
    ch.points_required,
    uc.points_achieved,
    uc.next_at,
    uc.finished_at,
    ch.course_id
  FROM chapters ch
  LEFT JOIN user_chapters uc ON uc.chapter_id = ch.id AND uc.user_id = user_id
),
courses_data AS (
  SELECT
    co.id,
    co.name AS course,
    co.position,
    co.class_id,
    co.subject_id,
    json_agg(
      json_build_object(
        'id', ch.id,
        'chapter', ch.chapter,
        'pointsAchieved', ch.points_achieved,
        'pointsRequired', ch.points_required,
        'nextAt', ch.next_at,
        'finishedAt', ch.finished_at
      ) ORDER BY ch.position ASC
    ) AS chapters
  FROM courses co
  LEFT JOIN chapters_data ch ON ch.course_id = co.id
  WHERE co.subject_id = subject_id
  GROUP BY co.id
),
classes_data AS (
  SELECT
    cl.id,
    cl.name AS class,
    cl.position,
    cl.school_level_id,
    json_agg(
      json_build_object(
        'id', co.id,
        'course', co.course,
        'chapters', co.chapters
      ) ORDER BY co.position ASC
    ) FILTER (WHERE co.id IS NOT NULL) AS courses
  FROM classes cl
  LEFT JOIN courses_data co ON co.class_id = cl.id
  GROUP BY cl.id
),
school_levels_data AS (
  SELECT
    sl.id,
    sl.position,
    sl.name AS level,
    json_agg(
      json_build_object(
        'id', cl.id,
        'class', cl.class,
        'courses', cl.courses
      ) ORDER BY cl.position ASC
    ) AS classes
  FROM school_levels sl
  LEFT JOIN classes_data cl ON cl.school_level_id = sl.id
  GROUP BY sl.id
)
SELECT json_agg(
  json_build_object(
    'id', sl.id,
    'level', sl.level,
    'classes', sl.classes
  ) ORDER BY sl.position ASC
)
FROM school_levels_data sl;
$$ LANGUAGE SQL STABLE;