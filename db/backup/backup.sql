--
-- PostgreSQL database dump
--

-- Dumped from database version 12.6 (Ubuntu 12.6-1.pgdg16.04+1)
-- Dumped by pg_dump version 13.2

-- Started on 2021-04-23 11:03:19 PDT

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
-- TOC entry 3900 (class 1262 OID 22295248)
-- Name: ddfc6ku6ecbabu; Type: DATABASE; Schema: -; Owner: cggsjbqpaeygrb
--

CREATE DATABASE ddfc6ku6ecbabu WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';


ALTER DATABASE ddfc6ku6ecbabu OWNER TO cggsjbqpaeygrb;

\connect ddfc6ku6ecbabu

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
-- TOC entry 2 (class 3079 OID 23423650)
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- TOC entry 3904 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 206 (class 1259 OID 29415961)
-- Name: portfolio; Type: TABLE; Schema: public; Owner: cggsjbqpaeygrb
--

CREATE TABLE public.portfolio (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    account_balance numeric NOT NULL,
    CONSTRAINT account_balance__nonnegative CHECK ((account_balance >= (0)::numeric))
);


ALTER TABLE public.portfolio OWNER TO cggsjbqpaeygrb;

--
-- TOC entry 205 (class 1259 OID 28105060)
-- Name: stocks; Type: TABLE; Schema: public; Owner: cggsjbqpaeygrb
--

CREATE TABLE public.stocks (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    company_symbol character varying(160) NOT NULL,
    share_units integer,
    CONSTRAINT share_units_nonnegative CHECK ((share_units >= 0))
);


ALTER TABLE public.stocks OWNER TO cggsjbqpaeygrb;

--
-- TOC entry 204 (class 1259 OID 23429067)
-- Name: user_sessions; Type: TABLE; Schema: public; Owner: cggsjbqpaeygrb
--

CREATE TABLE public.user_sessions (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    expires_at timestamp without time zone NOT NULL
);


ALTER TABLE public.user_sessions OWNER TO cggsjbqpaeygrb;

--
-- TOC entry 203 (class 1259 OID 23423717)
-- Name: users; Type: TABLE; Schema: public; Owner: cggsjbqpaeygrb
--

CREATE TABLE public.users (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    email character varying(320) NOT NULL,
    first_name character varying(35) NOT NULL,
    last_name character varying(35) NOT NULL,
    password character(60) NOT NULL,
    terms_and_policies_agreement boolean,
    date_created timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO cggsjbqpaeygrb;

--
-- TOC entry 3765 (class 2606 OID 29415970)
-- Name: portfolio portfolio_user_id_key; Type: CONSTRAINT; Schema: public; Owner: cggsjbqpaeygrb
--

ALTER TABLE ONLY public.portfolio
    ADD CONSTRAINT portfolio_user_id_key UNIQUE (user_id);


--
-- TOC entry 3763 (class 2606 OID 28105065)
-- Name: stocks stocks_user_id_company_symbol_key; Type: CONSTRAINT; Schema: public; Owner: cggsjbqpaeygrb
--

ALTER TABLE ONLY public.stocks
    ADD CONSTRAINT stocks_user_id_company_symbol_key UNIQUE (user_id, company_symbol);


--
-- TOC entry 3759 (class 2606 OID 23423725)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: cggsjbqpaeygrb
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3761 (class 2606 OID 23423723)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: cggsjbqpaeygrb
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3768 (class 2606 OID 29415971)
-- Name: portfolio portfolio_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cggsjbqpaeygrb
--

ALTER TABLE ONLY public.portfolio
    ADD CONSTRAINT portfolio_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3767 (class 2606 OID 28105066)
-- Name: stocks stocks_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cggsjbqpaeygrb
--

ALTER TABLE ONLY public.stocks
    ADD CONSTRAINT stocks_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3766 (class 2606 OID 23429071)
-- Name: user_sessions user_sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cggsjbqpaeygrb
--

ALTER TABLE ONLY public.user_sessions
    ADD CONSTRAINT user_sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3901 (class 0 OID 0)
-- Dependencies: 3900
-- Name: DATABASE ddfc6ku6ecbabu; Type: ACL; Schema: -; Owner: cggsjbqpaeygrb
--

REVOKE CONNECT,TEMPORARY ON DATABASE ddfc6ku6ecbabu FROM PUBLIC;


--
-- TOC entry 3902 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: cggsjbqpaeygrb
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO cggsjbqpaeygrb;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- TOC entry 3903 (class 0 OID 0)
-- Dependencies: 674
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON LANGUAGE plpgsql TO cggsjbqpaeygrb;


-- Completed on 2021-04-23 11:03:41 PDT

--
-- PostgreSQL database dump complete
--

