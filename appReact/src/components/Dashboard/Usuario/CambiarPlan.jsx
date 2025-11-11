const CambiarPlan = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    api
      .patch(`usuarios/${data.id}`, data)
      .then((response) => {
        toast.success(response.data.mensaje);
        dispatch(cambiarPlan(response.data.usuario));
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
    reset();
  };

  return (
    <div className="col-12">
      <form
        id="form-cambiar-plan"
        className="card card-body mb-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h5>{t("changePlan")}</h5>
        <input type="hidden" id="usuario-id" {...register("id")} />
        <div className="mb-2">
          <select
            id="usuario-plan"
            {...register("plan", { required: true })}
            className="form-select"
          >
            <option value="basico">{t("basicPlan")}</option>
            <option value="premium">{t("premiumPlan")}</option>
          </select>
          {errors.plan && (
            <small className="text-danger">{t("planRequired")}</small>
          )}
        </div>
        <div className="d-flex gap-2">
          <button
            className="btn btn-success"
            type="submit"
            disabled={isSubmitting}
          >
            {t("save")}
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => reset()}
          >
            {t("clean")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CambiarPlan;
