CREATE TABLE IF NOT EXISTS public.csb
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    nom character varying COLLATE pg_catalog."default" NOT NULL,
    adresse character varying COLLATE pg_catalog."default" NOT NULL,
    numero character varying COLLATE pg_catalog."default" NOT NULL,
    heure character varying COLLATE pg_catalog."default" NOT NULL,
    service character varying COLLATE pg_catalog."default" NOT NULL,
    geom geometry NOT NULL,
    lien character varying COLLATE pg_catalog."default",
    longitude double precision NOT NULL,
    latitude double precision NOT NULL,
    CONSTRAINT csb_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.csb
    OWNER to postgres;