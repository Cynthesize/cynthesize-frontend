--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2 (Ubuntu 11.2-1.pgdg16.04+1)
-- Dumped by pg_dump version 11.2 (Ubuntu 11.2-1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: ideas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ideas (
    id integer NOT NULL,
    idea_name text NOT NULL,
    description text NOT NULL,
    owner integer NOT NULL,
    "timestamp" timestamp with time zone DEFAULT now() NOT NULL,
    platform text,
    likes integer DEFAULT 0
);


--
-- Name: comment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comment (
    comment_text text NOT NULL,
    id integer NOT NULL,
    commenter integer NOT NULL,
    likes integer DEFAULT 0 NOT NULL,
    idea_id integer,
    "timestamp" timestamp with time zone DEFAULT now() NOT NULL,
    project_id integer,
    issue_id integer,
    launched_projects_id integer,
    previous_edits text
);


--
-- Name: comment_flag; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comment_flag (
    id integer NOT NULL,
    comment_id integer NOT NULL,
    user_id integer NOT NULL
);


--
-- Name: comment_flag_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.comment_flag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comment_flag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.comment_flag_id_seq OWNED BY public.comment_flag.id;


--
-- Name: comment_likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comment_likes (
    id integer NOT NULL,
    comment_id integer NOT NULL,
    user_id integer NOT NULL
);


--
-- Name: comment_likes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.comment_likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comment_likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.comment_likes_id_seq OWNED BY public.comment_likes.id;


--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comment.id;


--
-- Name: idea_likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.idea_likes (
    id integer NOT NULL,
    idea_id integer NOT NULL,
    user_id integer NOT NULL
);


--
-- Name: idea_likes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.idea_likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: idea_likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.idea_likes_id_seq OWNED BY public.idea_likes.id;


--
-- Name: ideas_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.ideas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ideas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.ideas_id_seq OWNED BY public.ideas.id;


--
-- Name: issues; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.issues (
    id integer NOT NULL,
    description text NOT NULL,
    checkpoint_name text NOT NULL,
    created_by integer NOT NULL,
    is_resolved boolean DEFAULT false NOT NULL,
    project_id integer NOT NULL,
    created_on timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: issues_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.issues_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: issues_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.issues_id_seq OWNED BY public.issues.id;


--
-- Name: launched_projects; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.launched_projects (
    id integer NOT NULL,
    comment_id integer,
    project_name text,
    "timestamp" timestamp with time zone DEFAULT now(),
    owner text,
    parent_project_id integer,
    likes integer DEFAULT 0
);


--
-- Name: launched_projects_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.launched_projects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: launched_projects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.launched_projects_id_seq OWNED BY public.launched_projects.id;


--
-- Name: launched_projects_likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.launched_projects_likes (
    launched_projects_id integer NOT NULL,
    user_id integer NOT NULL,
    id integer NOT NULL
);


--
-- Name: launched_projects_likes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.launched_projects_likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: launched_projects_likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.launched_projects_likes_id_seq OWNED BY public.launched_projects_likes.id;


--
-- Name: mentor_data; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.mentor_data (
    id integer NOT NULL,
    user_id integer NOT NULL,
    area_of_expertise text,
    employed_as text,
    employed_at text,
    availabilty text
);


--
-- Name: mentor_data_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.mentor_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: mentor_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.mentor_data_id_seq OWNED BY public.mentor_data.id;


--
-- Name: project_collaboration_requests; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.project_collaboration_requests (
    id integer NOT NULL,
    project_id integer NOT NULL,
    user_id integer NOT NULL,
    is_accepted boolean DEFAULT false NOT NULL,
    is_pending boolean DEFAULT true NOT NULL,
    for_role text NOT NULL,
    additional_info text
);


--
-- Name: project_collaboration_requests_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.project_collaboration_requests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: project_collaboration_requests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.project_collaboration_requests_id_seq OWNED BY public.project_collaboration_requests.id;


--
-- Name: project_collaborators; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.project_collaborators (
    id integer NOT NULL,
    project_id integer NOT NULL,
    user_id integer NOT NULL
);


--
-- Name: project_collaborators_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.project_collaborators_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: project_collaborators_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.project_collaborators_id_seq OWNED BY public.project_collaborators.id;


--
-- Name: project_description; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.project_description (
    id integer NOT NULL,
    project_id integer NOT NULL,
    xyz text,
    distinguishing_factor text,
    progress text,
    why_product text,
    revenue_model text,
    future_scope text,
    wow_factor text
);


--
-- Name: project_description_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.project_description_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: project_description_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.project_description_id_seq OWNED BY public.project_description.id;


--
-- Name: project_events; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.project_events (
    id integer NOT NULL,
    project_id integer NOT NULL,
    timeline jsonb DEFAULT '{}'::jsonb NOT NULL,
    green_board jsonb DEFAULT '{}'::jsonb NOT NULL
);


--
-- Name: project_events_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.project_events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: project_events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.project_events_id_seq OWNED BY public.project_events.id;


--
-- Name: project_likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.project_likes (
    id integer NOT NULL,
    project_id integer NOT NULL,
    user_id integer NOT NULL
);


--
-- Name: project_likes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.project_likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: project_likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.project_likes_id_seq OWNED BY public.project_likes.id;


--
-- Name: projects; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.projects (
    id integer NOT NULL,
    project_name text NOT NULL,
    description text DEFAULT 'No description found'::text NOT NULL,
    created_on timestamp with time zone DEFAULT now() NOT NULL,
    current_stage text NOT NULL,
    owner integer,
    tech_stack jsonb DEFAULT '[]'::jsonb,
    abstract text DEFAULT 'No abstract saved.'::text,
    website text,
    launched_id integer,
    roles_opened jsonb DEFAULT '[]'::jsonb,
    is_public boolean DEFAULT false,
    icon text,
    likes integer DEFAULT 0,
    platform text DEFAULT 'Web Application'::text,
    category text,
    is_launched boolean DEFAULT false NOT NULL
);


--
-- Name: projects_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.projects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: projects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.projects_id_seq OWNED BY public.projects.id;


--
-- Name: reply; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reply (
    comment_id integer NOT NULL,
    id integer NOT NULL,
    reply_text text NOT NULL,
    respondent integer NOT NULL,
    previous_edits jsonb,
    "timestamp" timestamp with time zone DEFAULT now() NOT NULL,
    likes integer DEFAULT 0
);


--
-- Name: reply_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.reply_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: reply_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.reply_id_seq OWNED BY public.reply.id;


--
-- Name: reply_likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reply_likes (
    id integer NOT NULL,
    reply_id integer NOT NULL,
    user_id integer NOT NULL
);


--
-- Name: reply_likes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.reply_likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: reply_likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.reply_likes_id_seq OWNED BY public.reply_likes.id;


--
-- Name: stage_consumer_feedback; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stage_consumer_feedback (
    id integer NOT NULL,
    project_id integer NOT NULL,
    is_passed boolean DEFAULT false NOT NULL
);


--
-- Name: stage_consumer_feedback_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.stage_consumer_feedback_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: stage_consumer_feedback_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.stage_consumer_feedback_id_seq OWNED BY public.stage_consumer_feedback.id;


--
-- Name: stage_funding; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stage_funding (
    id integer NOT NULL,
    project_id integer NOT NULL,
    is_passed boolean DEFAULT false NOT NULL
);


--
-- Name: stage_funding_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.stage_funding_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: stage_funding_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.stage_funding_id_seq OWNED BY public.stage_funding.id;


--
-- Name: stage_ideation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stage_ideation (
    id integer NOT NULL,
    project_id integer NOT NULL,
    issue_to_be_solved text,
    reinventing_the_wheel text,
    exclusive_effort text,
    key_features text,
    passed boolean DEFAULT false NOT NULL
);


--
-- Name: stage_ideation_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.stage_ideation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: stage_ideation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.stage_ideation_id_seq OWNED BY public.stage_ideation.id;


--
-- Name: stage_launching; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stage_launching (
    id integer NOT NULL,
    project_id integer NOT NULL,
    is_passed boolean DEFAULT false NOT NULL
);


--
-- Name: stage_launching_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.stage_launching_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: stage_launching_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.stage_launching_id_seq OWNED BY public.stage_launching.id;


--
-- Name: stage_marketing; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stage_marketing (
    id integer NOT NULL,
    project_id integer NOT NULL,
    is_passed boolean DEFAULT false NOT NULL,
    self_usability text,
    target_audience text,
    survey_taken text,
    market_analysis text,
    three_prime_audience text
);


--
-- Name: stage_marketing_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.stage_marketing_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: stage_marketing_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.stage_marketing_id_seq OWNED BY public.stage_marketing.id;


--
-- Name: stage_product_development; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stage_product_development (
    id integer NOT NULL,
    project_id integer NOT NULL,
    is_passed boolean DEFAULT false NOT NULL
);


--
-- Name: stage_product_development_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.stage_product_development_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: stage_product_development_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.stage_product_development_id_seq OWNED BY public.stage_product_development.id;


--
-- Name: tags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tags (
    tag_id integer NOT NULL,
    tag_name text NOT NULL
);


--
-- Name: tags_links; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tags_links (
    idea_id integer,
    id integer NOT NULL,
    project_id integer,
    tag_id integer NOT NULL
);


--
-- Name: tags_links_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tags_links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tags_links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tags_links_id_seq OWNED BY public.tags_links.id;


--
-- Name: tags_tag_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tags_tag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tags_tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tags_tag_id_seq OWNED BY public.tags.tag_id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    bio text,
    location text,
    website text,
    name text NOT NULL,
    profile_pic text,
    date_of_birth timestamp with time zone,
    social_links jsonb,
    technologies jsonb,
    is_mentor boolean DEFAULT false,
    last_seen timestamp with time zone
);


--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: comment id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comment ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: comment_flag id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comment_flag ALTER COLUMN id SET DEFAULT nextval('public.comment_flag_id_seq'::regclass);


--
-- Name: comment_likes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comment_likes ALTER COLUMN id SET DEFAULT nextval('public.comment_likes_id_seq'::regclass);


--
-- Name: idea_likes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.idea_likes ALTER COLUMN id SET DEFAULT nextval('public.idea_likes_id_seq'::regclass);


--
-- Name: ideas id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ideas ALTER COLUMN id SET DEFAULT nextval('public.ideas_id_seq'::regclass);


--
-- Name: issues id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.issues ALTER COLUMN id SET DEFAULT nextval('public.issues_id_seq'::regclass);


--
-- Name: launched_projects id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.launched_projects ALTER COLUMN id SET DEFAULT nextval('public.launched_projects_id_seq'::regclass);


--
-- Name: launched_projects_likes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.launched_projects_likes ALTER COLUMN id SET DEFAULT nextval('public.launched_projects_likes_id_seq'::regclass);


--
-- Name: mentor_data id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mentor_data ALTER COLUMN id SET DEFAULT nextval('public.mentor_data_id_seq'::regclass);


--
-- Name: project_collaboration_requests id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_collaboration_requests ALTER COLUMN id SET DEFAULT nextval('public.project_collaboration_requests_id_seq'::regclass);


--
-- Name: project_collaborators id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_collaborators ALTER COLUMN id SET DEFAULT nextval('public.project_collaborators_id_seq'::regclass);


--
-- Name: project_description id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_description ALTER COLUMN id SET DEFAULT nextval('public.project_description_id_seq'::regclass);


--
-- Name: project_events id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_events ALTER COLUMN id SET DEFAULT nextval('public.project_events_id_seq'::regclass);


--
-- Name: project_likes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_likes ALTER COLUMN id SET DEFAULT nextval('public.project_likes_id_seq'::regclass);


--
-- Name: projects id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects ALTER COLUMN id SET DEFAULT nextval('public.projects_id_seq'::regclass);


--
-- Name: reply id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reply ALTER COLUMN id SET DEFAULT nextval('public.reply_id_seq'::regclass);


--
-- Name: reply_likes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reply_likes ALTER COLUMN id SET DEFAULT nextval('public.reply_likes_id_seq'::regclass);


--
-- Name: stage_consumer_feedback id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stage_consumer_feedback ALTER COLUMN id SET DEFAULT nextval('public.stage_consumer_feedback_id_seq'::regclass);


--
-- Name: stage_funding id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stage_funding ALTER COLUMN id SET DEFAULT nextval('public.stage_funding_id_seq'::regclass);


--
-- Name: stage_ideation id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stage_ideation ALTER COLUMN id SET DEFAULT nextval('public.stage_ideation_id_seq'::regclass);


--
-- Name: stage_launching id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stage_launching ALTER COLUMN id SET DEFAULT nextval('public.stage_launching_id_seq'::regclass);


--
-- Name: stage_marketing id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stage_marketing ALTER COLUMN id SET DEFAULT nextval('public.stage_marketing_id_seq'::regclass);


--
-- Name: stage_product_development id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stage_product_development ALTER COLUMN id SET DEFAULT nextval('public.stage_product_development_id_seq'::regclass);


--
-- Name: tags tag_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tags ALTER COLUMN tag_id SET DEFAULT nextval('public.tags_tag_id_seq'::regclass);


--
-- Name: tags_links id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tags_links ALTER COLUMN id SET DEFAULT nextval('public.tags_links_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Name: comment_flag comment_flag_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comment_flag
    ADD CONSTRAINT comment_flag_pkey PRIMARY KEY (id);


--
-- Name: comment_likes comment_likes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comment_likes
    ADD CONSTRAINT comment_likes_pkey PRIMARY KEY (id);


--
-- Name: comment comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: idea_likes idea_likes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.idea_likes
    ADD CONSTRAINT idea_likes_pkey PRIMARY KEY (id);


--
-- Name: ideas ideas_idea_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ideas
    ADD CONSTRAINT ideas_idea_name_key UNIQUE (idea_name);


--
-- Name: ideas ideas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ideas
    ADD CONSTRAINT ideas_pkey PRIMARY KEY (id);


--
-- Name: issues issues_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.issues
    ADD CONSTRAINT issues_pkey PRIMARY KEY (id);


--
-- Name: launched_projects_likes launched_projects_likes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.launched_projects_likes
    ADD CONSTRAINT launched_projects_likes_pkey PRIMARY KEY (id);


--
-- Name: launched_projects launched_projects_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.launched_projects
    ADD CONSTRAINT launched_projects_pkey PRIMARY KEY (id);


--
-- Name: launched_projects launched_projects_project_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.launched_projects
    ADD CONSTRAINT launched_projects_project_name_key UNIQUE (project_name);


--
-- Name: mentor_data mentor_data_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mentor_data
    ADD CONSTRAINT mentor_data_pkey PRIMARY KEY (id);


--
-- Name: mentor_data mentor_data_user_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mentor_data
    ADD CONSTRAINT mentor_data_user_id_key UNIQUE (user_id);


--
-- Name: project_collaboration_requests project_collaboration_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_collaboration_requests
    ADD CONSTRAINT project_collaboration_requests_pkey PRIMARY KEY (id);


--
-- Name: project_collaborators project_collaborators_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_collaborators
    ADD CONSTRAINT project_collaborators_pkey PRIMARY KEY (id);


--
-- Name: project_description project_description_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_description
    ADD CONSTRAINT project_description_pkey PRIMARY KEY (id);


--
-- Name: project_description project_description_project_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_description
    ADD CONSTRAINT project_description_project_id_key UNIQUE (project_id);


--
-- Name: project_events project_events_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_events
    ADD CONSTRAINT project_events_pkey PRIMARY KEY (id);


--
-- Name: project_likes project_likes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_likes
    ADD CONSTRAINT project_likes_pkey PRIMARY KEY (id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: projects projects_project_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_project_name_key UNIQUE (project_name);


--
-- Name: reply_likes reply_likes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reply_likes
    ADD CONSTRAINT reply_likes_pkey PRIMARY KEY (id);


--
-- Name: reply reply_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reply
    ADD CONSTRAINT reply_pkey PRIMARY KEY (id);


--
-- Name: stage_consumer_feedback stage_consumer_feedback_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stage_consumer_feedback
    ADD CONSTRAINT stage_consumer_feedback_pkey PRIMARY KEY (id);


--
-- Name: stage_consumer_feedback stage_consumer_feedback_project_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stage_consumer_feedback
    ADD CONSTRAINT stage_consumer_feedback_project_id_key UNIQUE (project_id);


--
-- Name: stage_funding stage_funding_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stage_funding
    ADD CONSTRAINT stage_funding_pkey PRIMARY KEY (id);


--
-- Name: stage_funding stage_funding_project_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stage_funding
    ADD CONSTRAINT stage_funding_project_id_key UNIQUE (project_id);


--
-- Name: stage_ideation stage_ideation_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stage_ideation
    ADD CONSTRAINT stage_ideation_pkey PRIMARY KEY (id);


--
-- Name: stage_ideation stage_ideation_project_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stage_ideation
    ADD CONSTRAINT stage_ideation_project_id_key UNIQUE (project_id);


--
-- Name: stage_launching stage_launching_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stage_launching
    ADD CONSTRAINT stage_launching_pkey PRIMARY KEY (id);


--
-- Name: stage_launching stage_launching_project_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stage_launching
    ADD CONSTRAINT stage_launching_project_id_key UNIQUE (project_id);


--
-- Name: stage_marketing stage_marketing_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stage_marketing
    ADD CONSTRAINT stage_marketing_pkey PRIMARY KEY (id);


--
-- Name: stage_marketing stage_marketing_project_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stage_marketing
    ADD CONSTRAINT stage_marketing_project_id_key UNIQUE (project_id);


--
-- Name: stage_product_development stage_product_development_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stage_product_development
    ADD CONSTRAINT stage_product_development_pkey PRIMARY KEY (id);


--
-- Name: stage_product_development stage_product_development_project_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stage_product_development
    ADD CONSTRAINT stage_product_development_project_id_key UNIQUE (project_id);


--
-- Name: tags_links tags_links_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tags_links
    ADD CONSTRAINT tags_links_pkey PRIMARY KEY (id);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (tag_id);


--
-- Name: tags tags_tag_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_tag_name_key UNIQUE (tag_name);


--
-- Name: user user_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user user_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_username_key UNIQUE (username);


--
-- Name: comment comment_commenter_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_commenter_fkey FOREIGN KEY (commenter) REFERENCES public."user"(id);


--
-- Name: comment_flag comment_flag_comment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comment_flag
    ADD CONSTRAINT comment_flag_comment_id_fkey FOREIGN KEY (comment_id) REFERENCES public.comment(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: comment_flag comment_flag_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comment_flag
    ADD CONSTRAINT comment_flag_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: comment comment_idea_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_idea_id_fkey FOREIGN KEY (idea_id) REFERENCES public.ideas(id);


--
-- Name: comment comment_issue_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_issue_id_fkey FOREIGN KEY (issue_id) REFERENCES public.issues(id);


--
-- Name: comment comment_launched_projects_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_launched_projects_id_fkey FOREIGN KEY (launched_projects_id) REFERENCES public.projects(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: comment_likes comment_likes_comment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comment_likes
    ADD CONSTRAINT comment_likes_comment_id_fkey FOREIGN KEY (comment_id) REFERENCES public.comment(id);


--
-- Name: comment_likes comment_likes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comment_likes
    ADD CONSTRAINT comment_likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: comment comment_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id);


--
-- Name: idea_likes idea_likes_idea_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.idea_likes
    ADD CONSTRAINT idea_likes_idea_id_fkey FOREIGN KEY (idea_id) REFERENCES public.ideas(id);


--
-- Name: idea_likes idea_likes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.idea_likes
    ADD CONSTRAINT idea_likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: ideas ideas_owner_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ideas
    ADD CONSTRAINT ideas_owner_fkey FOREIGN KEY (owner) REFERENCES public."user"(id);


--
-- Name: issues issues_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.issues
    ADD CONSTRAINT issues_created_by_fkey FOREIGN KEY (created_by) REFERENCES public."user"(id);


--
-- Name: issues issues_project_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.issues
    ADD CONSTRAINT issues_project_id_fkey1 FOREIGN KEY (project_id) REFERENCES public.projects(id);


--
-- Name: launched_projects_likes launched_projects_likes_launched_projects_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.launched_projects_likes
    ADD CONSTRAINT launched_projects_likes_launched_projects_id_fkey FOREIGN KEY (launched_projects_id) REFERENCES public.launched_projects(id);


--
-- Name: launched_projects_likes launched_projects_likes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.launched_projects_likes
    ADD CONSTRAINT launched_projects_likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: launched_projects launched_projects_owner_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.launched_projects
    ADD CONSTRAINT launched_projects_owner_fkey FOREIGN KEY (owner) REFERENCES public."user"(username);


--
-- Name: launched_projects launched_projects_parent_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.launched_projects
    ADD CONSTRAINT launched_projects_parent_project_id_fkey FOREIGN KEY (parent_project_id) REFERENCES public.projects(id);


--
-- Name: mentor_data mentor_data_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mentor_data
    ADD CONSTRAINT mentor_data_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: project_collaboration_requests project_collaboration_requests_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_collaboration_requests
    ADD CONSTRAINT project_collaboration_requests_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: project_collaboration_requests project_collaboration_requests_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_collaboration_requests
    ADD CONSTRAINT project_collaboration_requests_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: project_collaborators project_collaborators_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_collaborators
    ADD CONSTRAINT project_collaborators_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id);


--
-- Name: project_collaborators project_collaborators_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_collaborators
    ADD CONSTRAINT project_collaborators_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: project_description project_description_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_description
    ADD CONSTRAINT project_description_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id);


--
-- Name: project_events project_events_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_events
    ADD CONSTRAINT project_events_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: project_likes project_likes_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_likes
    ADD CONSTRAINT project_likes_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id);


--
-- Name: project_likes project_likes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.project_likes
    ADD CONSTRAINT project_likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: projects projects_launched_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_launched_id_fkey FOREIGN KEY (launched_id) REFERENCES public.launched_projects(id);


--
-- Name: projects projects_owner_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_owner_fkey FOREIGN KEY (owner) REFERENCES public."user"(id);


--
-- Name: reply reply_comment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reply
    ADD CONSTRAINT reply_comment_id_fkey FOREIGN KEY (comment_id) REFERENCES public.comment(id);


--
-- Name: reply_likes reply_likes_reply_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reply_likes
    ADD CONSTRAINT reply_likes_reply_id_fkey FOREIGN KEY (reply_id) REFERENCES public.reply(id);


--
-- Name: reply_likes reply_likes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reply_likes
    ADD CONSTRAINT reply_likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: reply reply_respondent_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reply
    ADD CONSTRAINT reply_respondent_fkey FOREIGN KEY (respondent) REFERENCES public."user"(id);


--
-- Name: stage_consumer_feedback stage_consumer_feedback_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stage_consumer_feedback
    ADD CONSTRAINT stage_consumer_feedback_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: stage_funding stage_funding_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stage_funding
    ADD CONSTRAINT stage_funding_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: stage_ideation stage_ideation_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stage_ideation
    ADD CONSTRAINT stage_ideation_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: stage_launching stage_launching_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stage_launching
    ADD CONSTRAINT stage_launching_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: stage_marketing stage_marketing_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stage_marketing
    ADD CONSTRAINT stage_marketing_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: stage_product_development stage_product_development_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stage_product_development
    ADD CONSTRAINT stage_product_development_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: tags_links tags_links_idea_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tags_links
    ADD CONSTRAINT tags_links_idea_id_fkey FOREIGN KEY (idea_id) REFERENCES public.ideas(id);


--
-- Name: tags_links tags_links_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tags_links
    ADD CONSTRAINT tags_links_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id);


--
-- Name: tags_links tags_links_tag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tags_links
    ADD CONSTRAINT tags_links_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tags(tag_id);


--
-- PostgreSQL database dump complete
--

