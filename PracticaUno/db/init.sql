--
-- PostgreSQL database dump
--

\restrict kbDZsvk0bGT6UFYzeWLZZa9HEH64TAYu0FWQMaFd01BT3yC7DwX9bBYgyh9Uhyq

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-04-29 10:05:00

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 16659)
-- Name: author; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.author (
    id_author integer CONSTRAINT autor_id_autor_not_null NOT NULL,
    name character varying,
    last_name character varying,
    email character varying,
    phone integer,
    username character varying,
    password character varying
);


--
-- TOC entry 221 (class 1259 OID 16658)
-- Name: autor_id_autor_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.autor_id_autor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5032 (class 0 OID 0)
-- Dependencies: 221
-- Name: autor_id_autor_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.autor_id_autor_seq OWNED BY public.author.id_author;


--
-- TOC entry 220 (class 1259 OID 16648)
-- Name: post; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.post (
    id_post integer CONSTRAINT post_id_not_null NOT NULL,
    tittle character varying(255),
    date date,
    img text,
    "desc" text,
    id_author integer
);


--
-- TOC entry 219 (class 1259 OID 16647)
-- Name: post_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.post_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5033 (class 0 OID 0)
-- Dependencies: 219
-- Name: post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.post_id_seq OWNED BY public.post.id_post;


--
-- TOC entry 223 (class 1259 OID 16721)
-- Name: session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


--
-- TOC entry 4866 (class 2604 OID 16662)
-- Name: author id_author; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.author ALTER COLUMN id_author SET DEFAULT nextval('public.autor_id_autor_seq'::regclass);


--
-- TOC entry 4865 (class 2604 OID 16651)
-- Name: post id_post; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post ALTER COLUMN id_post SET DEFAULT nextval('public.post_id_seq'::regclass);


--
-- TOC entry 5025 (class 0 OID 16659)
-- Dependencies: 222
-- Data for Name: author; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.author (id_author, name, last_name, email, phone, username, password) FROM stdin;
1	Alejandra	Salgado Garcia	alejandra.salgado@email.com	123456789	alesal	RileyyRemi
2	Maria Isabel	Salgado Garcia	mariaisabel.salgado@email.com	987654321	starisabel	RemiyRiley
\.


--
-- TOC entry 5023 (class 0 OID 16648)
-- Dependencies: 220
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.post (id_post, tittle, date, img, "desc", id_author) FROM stdin;
1	Remi (Remo)	2026-02-23	./src/assets/remi.jpeg	Silly Remi lista para nadar	1
2	Riley	2026-02-20	./src/assets/riley.jpeg	Riley con dos coletitas lista para la escuela	1
3	Bethoveen (Beto)	2026-02-20	./src/assets/beto.jpeg	Bethoveen en su fat era (vive con mi hermano no lo puedo salvar 💔)	1
4	Baby Remi	2021-01-15	./src/assets/babyRemi.jpeg	Literalmente una papa, nos dijeron que no iba a crecer mucho y ahora esta enorme	2
5	Baby Riley	2024-07-02	./src/assets/babyRiley.jpeg	Estaba bien ojuda y panzona 🥺🥺	2
6	bethoveen ft Remi	2023-11-20	./src/assets/babyBeto.jpeg	Creo que a Remi no le cayo bien Bethoveen	2
67	Cuddly Remi	2026-04-22	./src/assets/WhatsApp Image 2026-04-22 at 10.17.49 AM.jpeg	\N	2
70	Riley dejandose acariciar	2026-04-22	./src/assets/WhatsApp Image 2026-04-22 at 12.39.41 PM.jpeg	\N	2
71	Remi playground	2026-04-24	./src/assets/WhatsApp Image 2026-04-24 at 6.28.25 PM.jpeg	\N	2
\.


--
-- TOC entry 5026 (class 0 OID 16721)
-- Dependencies: 223
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.session (sid, sess, expire) FROM stdin;
\.


--
-- TOC entry 5034 (class 0 OID 0)
-- Dependencies: 221
-- Name: autor_id_autor_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.autor_id_autor_seq', 1, false);


--
-- TOC entry 5035 (class 0 OID 0)
-- Dependencies: 219
-- Name: post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.post_id_seq', 71, true);


--
-- TOC entry 4870 (class 2606 OID 16667)
-- Name: author autor_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.author
    ADD CONSTRAINT autor_pkey PRIMARY KEY (id_author);


--
-- TOC entry 4868 (class 2606 OID 16656)
-- Name: post post_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_pkey PRIMARY KEY (id_post);


--
-- TOC entry 4873 (class 2606 OID 16730)
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- TOC entry 4871 (class 1259 OID 16731)
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);


--
-- TOC entry 4874 (class 2606 OID 16668)
-- Name: post fk_autor; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT fk_autor FOREIGN KEY (id_author) REFERENCES public.author(id_author);


-- Completed on 2026-04-29 10:05:01

--
-- PostgreSQL database dump complete
--

\unrestrict kbDZsvk0bGT6UFYzeWLZZa9HEH64TAYu0FWQMaFd01BT3yC7DwX9bBYgyh9Uhyq

