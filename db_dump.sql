--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4 (Ubuntu 16.4-0ubuntu0.24.04.2)
-- Dumped by pg_dump version 16.4 (Ubuntu 16.4-0ubuntu0.24.04.2)

-- Started on 2024-10-13 21:06:34 CEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3444 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16397)
-- Name: orders; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    customer_name character varying(255),
    date date,
    order_number character varying(255)
);


ALTER TABLE public.orders OWNER TO root;

--
-- TOC entry 215 (class 1259 OID 16396)
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_id_seq OWNER TO root;

--
-- TOC entry 3445 (class 0 OID 0)
-- Dependencies: 215
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- TOC entry 218 (class 1259 OID 16406)
-- Name: waypoints; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.waypoints (
    id integer NOT NULL,
    order_id integer,
    location character varying(255),
    type character varying(10),
    CONSTRAINT waypoints_type_check CHECK (((type)::text = ANY ((ARRAY['delivery'::character varying, 'pickup'::character varying])::text[])))
);


ALTER TABLE public.waypoints OWNER TO root;

--
-- TOC entry 217 (class 1259 OID 16405)
-- Name: waypoints_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.waypoints_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.waypoints_id_seq OWNER TO root;

--
-- TOC entry 3446 (class 0 OID 0)
-- Dependencies: 217
-- Name: waypoints_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.waypoints_id_seq OWNED BY public.waypoints.id;


--
-- TOC entry 3288 (class 2604 OID 16400)
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- TOC entry 3289 (class 2604 OID 16409)
-- Name: waypoints id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.waypoints ALTER COLUMN id SET DEFAULT nextval('public.waypoints_id_seq'::regclass);


--
-- TOC entry 3292 (class 2606 OID 16402)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 3294 (class 2606 OID 16412)
-- Name: waypoints waypoints_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.waypoints
    ADD CONSTRAINT waypoints_pkey PRIMARY KEY (id);


--
-- TOC entry 3295 (class 2606 OID 16413)
-- Name: waypoints waypoints_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.waypoints
    ADD CONSTRAINT waypoints_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


-- Completed on 2024-10-13 21:06:34 CEST

--
-- PostgreSQL database dump complete
--

