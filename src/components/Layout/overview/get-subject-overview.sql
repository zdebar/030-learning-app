CREATE OR REPLACE FUNCTION public.subject_overview(user_id UUID, subject_id INT)
RETURNS JSON AS $$
WITH chapters_data AS (
  SELECT
    ch.id,
    ch.name,
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
    co.name,
    co.position,
    co.class_id,
    co.subject_id,
    json_agg(
      json_build_object(
        'id', ch.id,
        'name', ch.name,
        'pointsAchieved', ch.points_achieved,
        'pointsRequired', ch.points_required,
        'nextAt', ch.next_at,
        'finishedAt', ch.finished_at
      ) ORDER BY ch.position ASC
    ) AS chapters
  FROM courses co
  INNER JOIN chapters_data ch ON ch.course_id = co.id
  WHERE co.subject_id = subject_id
  GROUP BY co.id
),
classes_data AS (
  SELECT
    cl.id,
    cl.name,
    cl.position,
    cl.school_level_id,
    json_agg(
      json_build_object(
        'id', co.id,
        'name', co.name,
        'chapters', co.chapters
      ) ORDER BY co.position ASC
    ) AS courses
  FROM classes cl
  INNER JOIN courses_data co ON co.class_id = cl.id
  GROUP BY cl.id
),
school_levels_data AS (
  SELECT
    sl.id,
    sl.position,
    sl.name,
    json_agg(
      json_build_object(
        'id', cl.id,
        'name', cl.name,
        'courses', cl.courses
      ) ORDER BY cl.position ASC
    ) FILTER (WHERE cl.id IS NOT NULL) AS classes
  FROM school_levels sl
  INNER JOIN classes_data cl ON cl.school_level_id = sl.id
  GROUP BY sl.id
)
SELECT json_agg(
  json_build_object(
    'id', sl.id,
    'name', sl.name,
    'classes', sl.classes
  ) ORDER BY sl.position ASC
) 
FROM school_levels_data sl;
$$ LANGUAGE SQL STABLE;